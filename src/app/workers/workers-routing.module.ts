import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WorkersComponent } from './workers.component';
import { WorkersGridComponent } from './workers-grid/workers-grid.component';
// import {WorkerEditComponent} from './worker-edit/worker-edit.component';

const workersRoutes: Routes = [
  {
    path: '', component: WorkersComponent, children: [
      {path: '', component: WorkersGridComponent},
      // {path: ':id/edit', component: WorkerEditComponent},
      // {path: 'new', component: WorkerEditComponent},
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
