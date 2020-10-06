import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentOptionListComponent } from './payment-option-list/payment-option-list.component';
import { PaymentOptionResolver } from './payment-option.resolver';
import { PaymentOptionFormComponent } from './payment-option-form/payment-option-form.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentOptionListComponent,
    resolve: {
      paymentOptions: PaymentOptionResolver
    }
  },
  {
    path: 'new',
    component: PaymentOptionFormComponent
  },
  {
    path: ':id/edit',
    component: PaymentOptionFormComponent,
    resolve: {
      paymentOption: PaymentOptionResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentOptionRoutingModule { }
