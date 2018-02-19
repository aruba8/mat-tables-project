import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WorkersComponent } from './workers.component';
import { WorkersGridComponent } from './workers-grid/workers-grid.component';
import { WorkerItemComponent } from './worker-item/worker-item.component';

const workersRoutes: Routes = [
  {
    path: '', component: WorkersComponent, children: [
      {path: '', component: WorkersGridComponent},
      {path: ':id/edit', component: WorkerItemComponent},
      {path: 'new', component: WorkerItemComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(workersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WorkersRoutingModule {

}
