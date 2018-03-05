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
  private authHeaders;

  constructor(private httpClient: HttpClient,
              private appConfig: AppConfig,
              private authService: AuthenticationService) {
    const baseUrl = this.appConfig.api.getBaseUrl();
    this.authHeaders = this.authService.getAuthorizationHeaders();
    this.usersEndPoint = baseUrl + this.appConfig.api.endpoints.users;
  }

  getUsers() {
    this.httpClient.get(this.usersEndPoint, {headers: this.authHeaders}).subscribe(
      (response: UserModel[]) => {
        this.users = response;
        this.usersChanged.next(this.users);
      },
    );
    return this.users;
  }

  getUser(id: string) {
    return this.httpClient.get<UserModel>(this.usersEndPoint + id + '/', {headers: this.authHeaders});
  }

  updateUser(user: UserModel) {
    return this.httpClient.put(this.usersEndPoint + user.id + '/', user, {headers: this.authHeaders});
  }

  addUser(user: UserModel) {
    return this.httpClient.post<UserModel>(this.usersEndPoint, user, {headers: this.authHeaders});
  }

  deleteUser(user: UserModel) {
    return this.httpClient.delete(this.usersEndPoint + user.id + '/', {headers: this.authHeaders});
  }

}
