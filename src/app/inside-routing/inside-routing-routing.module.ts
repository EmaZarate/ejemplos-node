import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsideRoutingComponent } from './inside-routing.component';

const routes: Routes = [
  {
    path: '',
    component: InsideRoutingComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: '../dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'category',
        loadChildren: '../category/category.module#CategoryModule'
      },
      {
        path: 'shipment',
        loadChildren: '../shipment-option/shipment-option.module#ShipmentOptionModule'
      },
      {
        path: 'states',
        loadChildren: '../order-state/order-state.module#OrderStateModule'
      },
      {
        path: 'payment',
        loadChildren: '../payment-option/payment-option.module#PaymentOptionModule'
      },
      {
        path: 'prices',
        loadChildren: '../price-list/price-list.module#PriceListModule'
      },
      {
        path: 'product',
        loadChildren: '../product/product.module#ProductModule'
      },
      {
        path: 'customer',
        loadChildren: '../customer/customer.module#CustomerModule'
      },
      {
        path: 'import',
        loadChildren: '../import/import.module#ImportModule'
      },
      {
        path: 'sales',
        loadChildren: '../sales/sales.module#SalesModule'
      },
      {
        path: 'orders',
        loadChildren: '../orders/order.module#OrderModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsideRoutingRoutingModule { }
