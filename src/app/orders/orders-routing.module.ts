import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './orders.component';
import {OrdersGridComponent} from './orders-grid/orders-grid.component';

const ordersRoutes: Routes = [
  {
    path: '', component: OrdersComponent, children: [
      {path: '', component: OrdersGridComponent},
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(ordersRoutes)
  ],
  exports: [
    RouterModule
  ]

})
export class OrdersRoutingModule {

  constructor() {
  }

}
