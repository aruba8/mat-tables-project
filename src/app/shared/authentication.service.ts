import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  baseUrl: string;
  private isUserAuthenticated: boolean;
  private token: string;
  private httpOptions;
  loginSubject = new Subject<boolean>();

  constructor(private appConfig: AppConfig, private httpClient: HttpClient) {
    this.baseUrl = appConfig.api.getBaseUrl();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.token = this.getStoredToken();
    this.autoRefresh();
  }

  login(email: string, password: string) {
    this.httpClient.post(this.baseUrl + 'api-token-auth/', JSON.stringify({
        username: email,
        password: password
      }
    ), this.httpOptions).subscribe(
      (resp: any) => {
        if (resp.token) {
          this.token = resp.token;
          this.loginSubject.next(true);
          this.isUserAuthenticated = true;
          localStorage.setItem('token', this.token);
        } else if (resp.non_field_errors) {
          this.token = null;
          this.loginSubject.next(false);
        }
      }
    );
  }

  logout() {
    this.token = null;
    this.isUserAuthenticated = false;
    localStorage.removeItem('token');
    this.loginSubject.next(false);
  }

  public getAuthorizationHeaders() {
    return {'Authorization': 'JWT ' + this.token};
  }

  isAuthenticated() {
    this.isUserAuthenticated = tokenNotExpired();
    return this.isUserAuthenticated;
  }

  getStoredToken() {
    return localStorage.getItem('token');
  }

  refreshToken() {
    if (this.token) {
      this.httpClient.post(this.baseUrl + 'api-token-refresh/',
        JSON.stringify({token: this.token}), this.httpOptions).subscribe(
        (response: any) => {
          this.token = response.token;
          localStorage.setItem('token', this.token);
        }, (error) => {
          if (error.status === 400) {
            localStorage.removeItem('token');
          }
        }
      );
    }
  }

  autoRefresh() {
    setTimeout(this.autoRefresh.bind(this), this.appConfig.config.tokenExpirationTime);
    if (this.token !== null && this.token !== undefined) {
      this.refreshToken();
    }
  }
}
