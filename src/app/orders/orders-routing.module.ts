import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrdersGridComponent } from './orders-grid/orders-grid.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { AuthGuard } from '../login/auth.guard';

const ordersRoutes: Routes = [
  {
    path: '', component: OrdersComponent, children: [
      {path: '', component: OrdersGridComponent, canActivate: [AuthGuard]},
      {path: ':id/edit', component: OrderItemComponent, canActivate: [AuthGuard]},
      {path: 'new', component: OrderItemComponent, canActivate: [AuthGuard]},
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(ordersRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]

})
export class OrdersRoutingModule {

  constructor() {
  }

}
