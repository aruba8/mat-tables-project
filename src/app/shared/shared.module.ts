import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AppConfig } from '../app.config';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@NgModule({
  imports: [
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule
  ],
  declarations: [
    SnackBarComponent,
    ConfirmationDialogComponent
  ],
  providers: [
    AppConfig
  ],
})
export class SharedModule {

}
