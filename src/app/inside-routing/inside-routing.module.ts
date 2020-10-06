import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsideRoutingRoutingModule } from './inside-routing-routing.module';
import { InsideRoutingComponent } from './inside-routing.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [InsideRoutingComponent],
  imports: [
    CommonModule,
    InsideRoutingRoutingModule,
    CoreModule
  ]
})
export class InsideRoutingModule { }
