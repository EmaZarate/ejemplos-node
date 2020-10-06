import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceListRoutingModule } from './price-list-routing.module';
import { PriceListListComponent } from './price-list-list/price-list-list.component';
import { SharedModule } from '../shared/shared.module';
import { PriceListFormComponent } from './price-list-form/price-list-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PriceListListComponent, PriceListFormComponent],
  imports: [
    CommonModule,
    PriceListRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PriceListModule { }
