import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderStateListComponent } from './order-state-list/order-state-list.component';
import { OrderStateResolver } from './order.state.resolver';
import { OrderStateFormComponent } from './order-state-form/order-state-form.component';

const routes: Routes = [
  {
    path: '',
    component: OrderStateListComponent,
    resolve: {
      orderStates: OrderStateResolver
    }
  },
  {
    path: 'new',
    component: OrderStateFormComponent
  },
  {
    path: ':id/edit',
    component: OrderStateFormComponent,
    resolve: {
      orderState: OrderStateResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderStateRoutingModule { }
