import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersGridComponent } from './users-grid/users-grid.component';
// import {UserEditComponent} from './user-edit/user-edit.component';

const usersRoutes: Routes = [
  {
    path: '', component: UsersComponent, children: [
      {path: '', component: UsersGridComponent},
      // {path: ':id/edit', component: UserEditComponent},
      // {path: 'new', component: UserEditComponent}
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
