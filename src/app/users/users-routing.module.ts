import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersGridComponent } from './users-grid/users-grid.component';
import { UserItemComponent } from './user-item/user-item.component';
import { AuthGuard } from '../login/auth.guard';

const usersRoutes: Routes = [
  {
    path: '', component: UsersComponent, children: [
      {path: '', component: UsersGridComponent, canActivate: [AuthGuard]},
      {path: ':id/card', component: UserItemComponent, canActivate: [AuthGuard]},
      {path: 'new', component: UserItemComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class UsersRoutingModule {

}
