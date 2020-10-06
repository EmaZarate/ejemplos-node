import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentOptionRoutingModule } from './payment-option-routing.module';
import { PaymentOptionListComponent } from './payment-option-list/payment-option-list.component';
import { SharedModule } from '../shared/shared.module';
import { PaymentOptionFormComponent } from './payment-option-form/payment-option-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaymentOptionListComponent, PaymentOptionFormComponent],
  imports: [
    CommonModule,
    PaymentOptionRoutingModule,
    SharedModule,

    FormsModule,
    ReactiveFormsModule
  ]
})
export class PaymentOptionModule { }
