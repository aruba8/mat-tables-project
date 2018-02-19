import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UserModel } from '../users.model';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.css']
})
export class UsersGridComponent implements OnInit, OnDestroy {
  private users: UserModel[];
  private usersSubscription: Subscription;
  private dataSource;
  displayedColumns = ['id', 'first_name', 'last_name', 'middle_name', 'email', 'actions'];


  constructor(private usersService: UsersService,
              private router: Router,
              private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.users = this.usersService.getUsers();
    this.usersSubscription = this.usersService.usersChanged.subscribe(
      (users: UserModel[]) => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
      }
    );
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

  openUser(id: string) {
    this.router.navigate([id, 'card'], {relativeTo: this.route});
  }

  onAddUser() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
