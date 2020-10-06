import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderResolver } from './order.resolver';
import { OrderUpdatestateComponent } from './order-updatestate/order-updatestate.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: OrderListComponent,
    resolve: {
      orders: OrderResolver
    }
  },
  {
    path: ':id/updatestate/:state',
    component: OrderUpdatestateComponent
  },
  {
    path: ':id/orderdetail',
    component: OrderDetailComponent,
    resolve: {
      order: OrderResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
