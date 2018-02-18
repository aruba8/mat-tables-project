import { NgModule } from '@angular/core';
import { UsersGridComponent } from './users-grid/users-grid.component';
import { UsersRoutingModule } from './users-routing.module';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import { UserItemComponent } from './user-item/user-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
      UsersRoutingModule,
      CommonModule,
      HttpClientModule,
      MatTableModule,
      MatInputModule,
      MatSidenavModule,
      MatButtonModule,
      MatCardModule,
      MatInputModule,
      ReactiveFormsModule,
      MatSnackBarModule
    ],
    declarations: [
      UsersGridComponent,
      UsersComponent,
      UserItemComponent,
    ],
    providers: [
      UsersService
    ]
  }
)
export class UsersModule {

}
