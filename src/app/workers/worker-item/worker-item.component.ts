import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WorkersService } from '../workers.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Worker, WorkerType } from '../worker.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-worker-item',
  templateUrl: './worker-item.component.html',
  styleUrls: ['./worker-item.component.css']
})
export class WorkerItemComponent implements OnInit {
  selectedType: WorkerType;
  workerFormGroup: FormGroup;
  workerTypes: WorkerType[];
  worker: Worker;
  workerId: string;
  editMode: boolean;

  constructor(private workersService: WorkersService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.workerId = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        this.initWorkerTypes();
      }
    );
  }

  initWorkerTypes() {
    this.workersService.getWorkerTypes().subscribe(
      (types) => {
        this.workerTypes = types;
      }
    );
  }

  initForm() {
    this.worker = new Worker(-1, '', {'id': -1, 'worker_type_name': ''});
    this.populateForm(this.worker);
    if (this.editMode) {
      this.workersService.getWorker(this.workerId).subscribe(
        (response: Worker) => {
          this.worker = response;
          this.populateForm(this.worker);
        }
      );
    } else {
      this.populateForm(this.worker);
    }
  }

  private populateForm(worker: Worker) {
    this.workerFormGroup = new FormGroup({
      'name': new FormControl(worker.name, [Validators.required]),
      'workerType': new FormControl(worker.worker_type.id, [Validators.required]),
    });
  }

  onBack() {
    this.router.navigate(['/workers']);
  }

  onSaveWorker() {
    const workerType = this.getWorkerTypeById(this.workerFormGroup.value.workerType);

    if (this.editMode) {
      const worker = this.worker;
      worker.worker_type = workerType;
      worker.name = this.workerFormGroup.value.name;
      this.workersService.updateWorker(this.worker).subscribe(
        () => {
          this.openSnackBar('Worker updated!!', 'close', 'worker-snackbar-success');
        },
        (error) => {
          this.openSnackBar('Something went wrong on updating', 'close', 'worker-snackbar-fail');
          console.log(error);
        }
      );


    } else {
      const worker = new Worker(-1, this.workerFormGroup.value.name, workerType);
      console.log(worker);
      this.workersService.addWorker(worker).subscribe(
        (resp: Worker) => {
          this.router.navigate(['workers', resp.id, 'edit']);
        }
      );

    }

  }

  getWorkerTypeById(id: number) {
    return this.workerTypes.filter(w => w.id === id)[0];
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      'data': {
        entityName: 'Worker',
        message: this.worker.name
      }
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log(result);
        if (result === true) {
          this.workersService.deleteWorker(this.worker).subscribe(
            () => {
              this.router.navigate(['workers']);
            }
          );
        }
      }
    );

  }

  private openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
      extraClasses: [className]
    });
  }


}
