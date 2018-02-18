import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserModel } from '../users.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  userId: string;
  user: UserModel = new UserModel(1, '', '', '', '');

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.userId = params['id'];
        this.usersService.getUser(this.userId).subscribe(
          (user: UserModel) => {
            this.user = user;
          }
        );
      }
    );
  }

}
