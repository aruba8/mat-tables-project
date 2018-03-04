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
  MatDialogModule,
  MatInputModule,
  MatSidenavModule, MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import { UserItemComponent } from './user-item/user-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
      UsersRoutingModule,
      CommonModule,
      HttpClientModule,
      MatTableModule,
      MatSidenavModule,
      MatButtonModule,
      MatCardModule,
      MatInputModule,
      ReactiveFormsModule,
      MatDialogModule,
      MatSnackBarModule,
      SharedModule
    ],
    declarations: [
      UsersGridComponent,
      UsersComponent,
      UserItemComponent,
    ],
    providers: [
      UsersService
    ],
    entryComponents: [
      ConfirmationDialogComponent,
      SnackBarComponent
    ]
  }
)
export class UsersModule {

}
