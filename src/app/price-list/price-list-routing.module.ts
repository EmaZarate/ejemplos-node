import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceListListComponent } from './price-list-list/price-list-list.component';
import { PriceListResolver } from './price-list.resolver';
import { PriceListFormComponent } from './price-list-form/price-list-form.component';
import { PriceListsResolver } from './price-lists.resolver';

const routes: Routes = [
  {
    path: '',
    component: PriceListListComponent,
    resolve: {
      priceLists: PriceListsResolver
    }
  },
  {
    path: 'new',
    component: PriceListFormComponent
  },
  {
    path: ':id/edit',
    component: PriceListFormComponent,
    resolve: {
      priceList: PriceListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceListRoutingModule { }
