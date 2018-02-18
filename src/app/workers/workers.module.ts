import { NgModule } from '@angular/core';
import { WorkersGridComponent } from './workers-grid/workers-grid.component';
import { CommonModule } from '@angular/common';
import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersComponent } from './workers.component';

@NgModule({
    imports: [
      WorkersRoutingModule,
      CommonModule
    ],
    declarations: [
      WorkersGridComponent,
      WorkersComponent
    ],
    providers: []
  }
)
export class WorkersModule {

}
