import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
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
  ],

})
export class AppRoutingModule {
}
