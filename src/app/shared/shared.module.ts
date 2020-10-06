import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, PaginatorEspañol } from './components/table/table.component';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatSliderModule,
  MatGridListModule,
  MatDividerModule,
  MatTooltipModule,
  MatPaginatorIntl
} from '@angular/material';
import { TranslateHeaderPipe } from './pipes/translate-header.pipe';
import { ListLayoutComponent } from './components/list-layout/list-layout.component';
import { FormLayoutComponent } from './components/form-layout/form-layout.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CardProductComponent } from './components/card-product/card-product.component';
import { MatRippleModule } from '@angular/material/core';
import { ImagePickerComponent } from './components/image-picker/image-picker.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateBooleansPipe } from './pipes/translate-booleans.pipe';
import { LockDialogComponent } from './components/lock-dialog/lock-dialog.component';
import { CardSmDashboardComponent } from './components/card-sm-dashboard/card-sm-dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TableComponent,
    TranslateHeaderPipe,
    ListLayoutComponent,
    FormLayoutComponent,
    DeleteDialogComponent,
    CardProductComponent,
    ImagePickerComponent,
    TranslateBooleansPipe,
    LockDialogComponent,
    CardSmDashboardComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSliderModule,
    MatRippleModule,
    MatSelectModule,
    MatGridListModule,
    MatDividerModule,
    MatTooltipModule
  ],
  entryComponents: [
    DeleteDialogComponent,
    LockDialogComponent
  ],
  exports: [
    TableComponent,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatSelectModule,
    MatInputModule,
    TranslateHeaderPipe,
    ListLayoutComponent,
    FormLayoutComponent,
    DeleteDialogComponent,
    CardProductComponent,
    MatRippleModule,
    ImagePickerComponent,
    MatGridListModule,
    CardSmDashboardComponent,
    MatTableModule,
    MatDividerModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorEspañol}]
})
export class SharedModule { }
