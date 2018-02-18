import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './users.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UsersService {

  private readonly usersEndPoint = 'http://localhost:8000/users/';
  private users: UserModel[];
  usersChanged = new Subject<UserModel[]>();

  constructor(protected httpClient: HttpClient) {
  }

  getUsers() {
    this.httpClient.get(this.usersEndPoint).subscribe(
      (response: UserModel[]) => {
        this.users = response;
        this.usersChanged.next(this.users);
      },
    );
    return this.users;
  }

  getUser(id: string) {
    return this.httpClient.get<UserModel>(this.usersEndPoint + id + '/');
  }

  updateUser(user: UserModel) {
    return this.httpClient.put(this.usersEndPoint + user.id + '/', user);
  }

}
