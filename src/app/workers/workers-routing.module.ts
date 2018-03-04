import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WorkersComponent } from './workers.component';
import { WorkersGridComponent } from './workers-grid/workers-grid.component';
import { WorkerItemComponent } from './worker-item/worker-item.component';
import { AuthGuard } from '../login/auth.guard';

const workersRoutes: Routes = [
  {
    path: '', component: WorkersComponent, children: [
      {path: '', component: WorkersGridComponent, canActivate: [AuthGuard]},
      {path: ':id/edit', component: WorkerItemComponent, canActivate: [AuthGuard]},
      {path: 'new', component: WorkerItemComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(workersRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class WorkersRoutingModule {

}
