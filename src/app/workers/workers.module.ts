import { NgModule } from '@angular/core';
import { WorkersGridComponent } from './workers-grid/workers-grid.component';
import { CommonModule } from '@angular/common';
import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersComponent } from './workers.component';
import { WorkersService } from './workers.service';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import { WorkerItemComponent } from './worker-item/worker-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackBarComponent } from './worker-item/snack-bar/snack-bar.component';
import { ConfirmationDialogComponent } from './worker-item/confirmation-dialog/confirmation-dialog.component';

@NgModule({
    imports: [
      WorkersRoutingModule,
      CommonModule,
      HttpClientModule,
      MatTableModule,
      MatButtonModule,
      MatCardModule,
      MatInputModule,
      ReactiveFormsModule,
      MatSelectModule,
      MatOptionModule,
      MatDialogModule,
      MatSnackBarModule
    ],
    declarations: [
      WorkersGridComponent,
      WorkersComponent,
      WorkerItemComponent,
      SnackBarComponent,
      ConfirmationDialogComponent
    ],
    providers: [
      WorkersService
    ],
    entryComponents: [
      ConfirmationDialogComponent
    ]
  }
)
export class WorkersModule {

}
