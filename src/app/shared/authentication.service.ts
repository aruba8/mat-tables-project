import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthenticationService {
  baseUrl: string;
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
  }

  login(email: string, password: string) {
    return this.httpClient.post(this.baseUrl + 'api-token-auth/', JSON.stringify({
        username: email,
        password: password
      }
    ), this.httpOptions).subscribe(
      (resp: any) => {
        if (resp.token) {
          this.token = resp.token;
          this.loginSubject.next(true);
          localStorage.setItem('token', this.token);
        } else if (resp.non_field_errors) {
          this.token = null;
          this.loginSubject.next(false);
        }
      }
    );
  }

  public getAuthorizationHeaders() {
    return {'Authorization': 'JWT ' + this.token};
  }

  retrieveToken(response: { token: string }) {
    return response.token;
  }

  isAuthenticated() {
    console.log(this.token);
    return this.token != null;
  }

  getStoredToken() {
    return localStorage.getItem('token');
  }


}
