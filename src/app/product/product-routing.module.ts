import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductResolver } from './product.resolver';
import { PriceListsResolver } from '../price-list/price-lists.resolver';
import { CategoriesResolver } from '../category/categories.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    resolve: {
      products: ProductResolver
    }
  },
  {
    path: ':id/detail',
    component: ProductDetailComponent,
    resolve: {
      product: ProductResolver,
      priceLists: PriceListsResolver,
      categories: CategoriesResolver
    }
  },
  {
    path: 'new',
    component: ProductDetailComponent,
    resolve: {
      priceLists: PriceListsResolver,
      categories: CategoriesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
