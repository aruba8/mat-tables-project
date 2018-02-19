import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserModel } from '../users.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent implements OnInit {
  userId: string;
  user: UserModel;
  userFormGroup: FormGroup;
  editMode = false;

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.userId = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSaveUser() {
    const updatedUser = new UserModel(
      this.user.id,
      this.userFormGroup.value.firstName,
      this.userFormGroup.value.lastName,
      this.userFormGroup.value.middleName,
      this.userFormGroup.value.email
    );
    if (this.editMode) {
      this.usersService.updateUser(updatedUser).subscribe(
        () => {
          this.openSnackBar('User successfully updated!', 'close', 'snack-bar-success');
          this.populateForm(updatedUser);
        },
        (error) => {
          this.openSnackBar('Something went wrong!', 'close', 'snack-bar-error');
          console.log(error);
        }
      )
      ;
    } else {
      this.usersService.addUser(updatedUser).subscribe(
        (user: UserModel) => {
          this.user = user;
          this.populateForm(user);
          this.router.navigate(['users', user.id, 'card']);
        }
      );
    }
  }

  onBack() {
    this.router.navigate(['/users'], {relativeTo: this.route});
  }

  private initForm() {
    this.user = new UserModel(-1, '', '', '', '');
    this.populateForm(this.user);
    if (this.editMode) {
      this.usersService.getUser(this.userId).subscribe(
        (user: UserModel) => {
          this.user = user;
          this.populateForm(this.user);
        }
      );
    }

  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {'data': this.user});
    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log(result);
        if (result === true) {
          this.usersService.deleteUser(this.user).subscribe(
            () => this.router.navigate(['/users'])
          );
        }
      }
    );
  }

  private populateForm(user: UserModel) {
    this.userFormGroup = new FormGroup({
      'firstName': new FormControl(user.first_name, [Validators.required]),
      'lastName': new FormControl(user.last_name, [Validators.required]),
      'middleName': new FormControl(user.middle_name),
      'email': new FormControl(user.email, [Validators.email])
    });
  }

  private openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
      extraClasses: [className]
    });
  }

}
