import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesFormComponent } from './sales-form/sales-form.component';
import { MatExpansionModule, MatGridListModule, MatTooltipModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SaleListComponent } from './sale-list/sale-list.component';

@NgModule({
  declarations: [SalesFormComponent, SaleListComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatExpansionModule,
    MatTooltipModule
  ]
})
export class SalesModule { }
