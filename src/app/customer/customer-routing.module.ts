import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerResolver } from './customer.resolver';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerResetpasswordFormComponent } from './customer-resetpassword-form/customer-resetpassword-form.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    resolve: {
      customers: CustomerResolver
    }
  },
  {
    path: 'new',
    component: CustomerFormComponent,
  },
  {
    path: ':id/restartpassword',
    component: CustomerResetpasswordFormComponent
  }
  // {
  //   path: ':id/edit',
  //   component: CustomerFormComponent,
  //   resolve: {
  //     customer: CustomerResolver
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
