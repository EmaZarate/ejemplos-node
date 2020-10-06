import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipmentOptionListComponent } from './shipment-option-list/shipment-option-list.component';
import { ShipmentOptionResolver } from './shipment-option.resolver';
import { ShipmentOptionFormComponent } from './shipment-option-form/shipment-option-form.component';

const routes: Routes = [
  {
    path: '',
    component: ShipmentOptionListComponent,
    resolve: {
      shipmentOptions: ShipmentOptionResolver
    }
  },
  {
    path: 'new',
    component: ShipmentOptionFormComponent
  },
  {
    path: ':id/edit',
    component: ShipmentOptionFormComponent,
    resolve: {
      shipmentOption: ShipmentOptionResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentOptionRoutingModule { }
