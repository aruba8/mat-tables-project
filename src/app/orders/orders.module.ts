import { NgModule } from '@angular/core';
import { OrdersGridComponent } from './orders-grid/orders-grid.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrdersService } from './orders.service';
import { OrderItemComponent } from './order-item/order-item.component';
import { WorkersService } from '../workers/workers.service';

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
            MatInputModule
        ],
        declarations: [
            OrdersGridComponent,
            OrdersComponent,
            OrderItemComponent
        ],
        providers: [OrdersService, WorkersService]
    }
)
export class OrdersModule {

}
