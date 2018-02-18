import { NgModule } from '@angular/core';
import { UsersGridComponent } from './users-grid/users-grid.component';
import { UsersRoutingModule } from './users-routing.module';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';

@NgModule({
    imports: [
      UsersRoutingModule,
      CommonModule,
    ],
    declarations: [
      UsersGridComponent,
      UsersComponent
    ],
    providers: []
  }
)
export class UsersModule {

}
