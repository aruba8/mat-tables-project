import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  loginSubscription: Subscription;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    const email = this.loginFormGroup.value.username;
    const password = this.loginFormGroup.value.password;
    this.authService.login(email, password);
    this.loginSubscription = this.authService.loginSubject.subscribe(
      (isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['']);
        }
      }
    );
  }

}
