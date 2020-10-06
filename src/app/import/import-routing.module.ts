import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsImportComponent } from './products-import/products-import.component';
import { DashboardImportComponent } from './dashboard-import/dashboard-import.component';
import { ClientsImportComponent } from './clients-import/clients-import.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardImportComponent
  },
  {
    path: 'products',
    component: ProductsImportComponent
  },
  {
    path: 'clients',
    component: ClientsImportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportRoutingModule { }
