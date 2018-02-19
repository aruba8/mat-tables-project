import { Component, OnDestroy, OnInit } from '@angular/core';
import { Worker } from '../worker.model';
import { WorkersService } from '../workers.service';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-workers-grid',
  templateUrl: './workers-grid.component.html',
  styleUrls: ['./workers-grid.component.css']
})
export class WorkersGridComponent implements OnInit, OnDestroy {

  private workers: Worker[];
  private workersSubscription: Subscription;
  private dataSource;
  displayedColumns = ['id', 'name', 'worker_type', 'action'];

  constructor(private workersService: WorkersService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.workers = this.workersService.getWorkers();
    this.workersSubscription = this.workersService.workersChanged.subscribe(
      (workers: Worker[]) => {
        this.workers = workers;
        this.dataSource = new MatTableDataSource(this.workers);
      }
    );
  }

  ngOnDestroy() {
    this.workersSubscription.unsubscribe();
  }

  onAddWorker() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  openWorker(id: string) {
    this.router.navigate([id, 'edit'], {relativeTo: this.route});
  }
}
