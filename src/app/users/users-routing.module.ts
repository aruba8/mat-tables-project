import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersGridComponent } from './users-grid/users-grid.component';
import { UserItemComponent } from './user-item/user-item.component';

const usersRoutes: Routes = [
  {
    path: '', component: UsersComponent, children: [
      {path: '', component: UsersGridComponent},
      {path: ':id/card', component: UserItemComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule {

}
