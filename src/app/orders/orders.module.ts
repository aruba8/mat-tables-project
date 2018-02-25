import { NgModule } from '@angular/core';
import { OrdersGridComponent } from './orders-grid/orders-grid.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrdersService } from './orders.service';
import { OrderItemComponent } from './order-item/order-item.component';
import { WorkersService } from '../workers/workers.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
      OrdersRoutingModule,
      CommonModule,
      MatTableModule,
      MatButtonModule,
      ReactiveFormsModule,
      HttpClientModule,
      MatFormFieldModule,
      MatSelectModule,
      MatCardModule,
      MatOptionModule,
      MatInputModule,
      MatDialogModule,
      MatSnackBarModule,
      SharedModule

    ],
    declarations: [
      OrdersGridComponent,
      OrdersComponent,
      OrderItemComponent,
      ConfirmationDialogComponent
    ],
    providers: [OrdersService, WorkersService],
    entryComponents: [ConfirmationDialogComponent]
  }
)
export class OrdersModule {

}
