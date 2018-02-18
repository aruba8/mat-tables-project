import { NgModule } from '@angular/core';
import { OrdersGridComponent } from './orders-grid/orders-grid.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';

@NgModule({
    imports: [
      OrdersRoutingModule,
      CommonModule
    ],
    declarations: [
      OrdersGridComponent,
      OrdersComponent
    ],
    providers: []
  }
)
export class OrdersModule {

}
