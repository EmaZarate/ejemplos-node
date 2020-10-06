import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderStateRoutingModule } from './order-state-routing.module';
import { OrderStateListComponent } from './order-state-list/order-state-list.component';
import { SharedModule } from '../shared/shared.module';
import { OrderStateFormComponent } from './order-state-form/order-state-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderStateListComponent, OrderStateFormComponent],
  imports: [
    CommonModule,
    OrderStateRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrderStateModule { }
