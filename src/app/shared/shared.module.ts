import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  imports: [
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    SnackBarComponent,
    ConfirmationDialogComponent
  ],
  providers: [],
})
export class SharedModule {

}
