import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderUpdatestateComponent } from './order-updatestate/order-updatestate.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [OrderListComponent, OrderUpdatestateComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OrderModule { }
