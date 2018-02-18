import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', loadChildren: './users/users.module#UsersModule'},
  {path: 'workers', loadChildren: './workers/workers.module#WorkersModule'},
  {path: 'orders', loadChildren: './orders/orders.module#OrdersModule'},
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule {
}
