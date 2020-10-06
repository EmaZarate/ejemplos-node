import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipmentOptionRoutingModule } from './shipment-option-routing.module';
import { ShipmentOptionListComponent } from './shipment-option-list/shipment-option-list.component';
import { SharedModule } from '../shared/shared.module';
import { ShipmentOptionFormComponent } from './shipment-option-form/shipment-option-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ShipmentOptionListComponent, ShipmentOptionFormComponent],
  imports: [
    CommonModule,
    ShipmentOptionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShipmentOptionModule { }
