import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './users.model';
import { Subject } from 'rxjs/Subject';
import { AppConfig } from '../app.config';
import { AuthenticationService } from '../shared/authentication.service';

@Injectable()
export class UsersService {

  private users: UserModel[];
  usersChanged = new Subject<UserModel[]>();
  private usersEndPoint;

  constructor(private httpClient: HttpClient,
              private appConfig: AppConfig,
              private authService: AuthenticationService) {
    const baseUrl = this.appConfig.api.getBaseUrl();
    this.usersEndPoint = baseUrl + this.appConfig.api.endpoints.users;
  }

  getUsers() {
    const authHeaders = this.authService.getAuthorizationHeaders();
    this.httpClient.get(this.usersEndPoint, {headers: authHeaders}).subscribe(
      (response: UserModel[]) => {
        this.users = response;
        this.usersChanged.next(this.users);
      },
    );
    return this.users;
  }

  getUser(id: string) {
    const authHeaders = this.authService.getAuthorizationHeaders();
    return this.httpClient.get<UserModel>(this.usersEndPoint + id + '/', {headers: authHeaders});
  }

  updateUser(user: UserModel) {
    const authHeaders = this.authService.getAuthorizationHeaders();
    return this.httpClient.patch(this.usersEndPoint + user.id + '/', user, {headers: authHeaders});
  }

  addUser(user: UserModel) {
    const authHeaders = this.authService.getAuthorizationHeaders();
    return this.httpClient.post<UserModel>(this.usersEndPoint, user, {headers: authHeaders});
  }

  deleteUser(user: UserModel) {
    const authHeaders = this.authService.getAuthorizationHeaders();
    return this.httpClient.delete(this.usersEndPoint + user.id + '/', {headers: authHeaders});
  }

}
