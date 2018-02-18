import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserModel } from '../users.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent implements OnInit {
  userId: string;
  user: UserModel;
  userFormGroup: FormGroup;
  showSuccess = false;
  showError = false;

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.userId = params['id'];
        this.initForm();
      }
    );
  }

  onSaveUser() {
    console.log(this.user);
    const updatedUser = new UserModel(
      this.user.id,
      this.userFormGroup.value.firstName,
      this.userFormGroup.value.lastName,
      this.userFormGroup.value.middleName,
      this.userFormGroup.value.email
    );
    this.usersService.updateUser(updatedUser).subscribe(
      () => {
        this.populateForm(updatedUser);
      },
      () => this.showError = true
    );
  }

  onBack() {
    this.router.navigate(['/users'], {relativeTo: this.route});
  }

  private initForm() {
    this.user = new UserModel(-1, '', '', '', '');
    this.populateForm(this.user);
    this.usersService.getUser(this.userId).subscribe(
      (user: UserModel) => {
        this.user = user;
        this.populateForm(this.user);
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

}
