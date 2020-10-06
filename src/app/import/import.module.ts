import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportRoutingModule } from './import-routing.module';
import { ProductsImportComponent } from './products-import/products-import.component';
import { DashboardImportComponent } from './dashboard-import/dashboard-import.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ClientsImportComponent } from './clients-import/clients-import.component';

@NgModule({
  declarations: [
    ProductsImportComponent,
    DashboardImportComponent,
    ClientsImportComponent
  ],
  imports: [
    CommonModule,
    ImportRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    MatProgressSpinnerModule
  ]
})
export class ImportModule { }
