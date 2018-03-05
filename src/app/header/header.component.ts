import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = 'Admin section';
  isLoggedIn: boolean;
  private loginSubscription: Subscription;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.loginSubscription = this.authService.loginSubject.subscribe(
      (isLogged: boolean) => {
        this.isLoggedIn = isLogged;
      }
    );
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
