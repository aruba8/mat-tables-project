import { NgModule } from '@angular/core';
import { OrdersGridComponent } from './orders-grid/orders-grid.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { MatButtonModule, MatTableModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrdersService } from './orders.service';
import { OrderItemComponent } from './order-item/order-item.component';

@NgModule({
        imports: [
            OrdersRoutingModule,
            CommonModule,
            MatTableModule,
            MatButtonModule,
            ReactiveFormsModule,
            HttpClientModule
        ],
        declarations: [
            OrdersGridComponent,
            OrdersComponent,
            OrderItemComponent
        ],
        providers: [OrdersService]
    }
)
export class OrdersModule {

}
