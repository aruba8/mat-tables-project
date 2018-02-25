import { NgModule } from '@angular/core';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  imports: [
    MatSnackBarModule,
    MatDialogModule,
  ],
  declarations: [
    SnackBarComponent
  ],
  providers: [],
})
export class SharedModule {

}
