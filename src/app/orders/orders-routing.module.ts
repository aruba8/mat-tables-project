import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrdersGridComponent } from './orders-grid/orders-grid.component';
import { OrderItemComponent } from './order-item/order-item.component';

const ordersRoutes: Routes = [
    {
        path: '', component: OrdersComponent, children: [
            {path: '', component: OrdersGridComponent},
            {path: ':id/edit', component: OrderItemComponent},
            {path: 'new', component: OrderItemComponent},
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
