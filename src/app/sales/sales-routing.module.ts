import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesFormComponent } from './sales-form/sales-form.component';
import { ProductResolver } from './product.resolver';
import { PriceListsResolver } from '../price-list/price-lists.resolver';
import { SaleResolver } from './sale.resolver';
import { SaleListComponent } from './sale-list/sale-list.component';
import { SalesResolver } from './sales.resolver';

const routes: Routes = [
  {
    path: '',
    component: SaleListComponent,
    resolve: {
      sales: SalesResolver
    }
  },
  {
    path: 'new',
    component: SalesFormComponent,
    resolve: {
      products: ProductResolver,
      priceLists: PriceListsResolver,
    }
  },
  {
    path: ':id/edit',
    component: SalesFormComponent,
    resolve: {
      products: ProductResolver,
      priceLists: PriceListsResolver,
      sale: SaleResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
