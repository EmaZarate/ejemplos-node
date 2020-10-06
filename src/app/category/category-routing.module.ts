import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryResolver } from './category.resolver';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoriesResolver } from './categories.resolver';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
    resolve: {categories : CategoriesResolver}
  },
  {
    path: 'new',
    component: CategoryFormComponent
  },
  {
    path: ':id/edit',
    component: CategoryFormComponent,
    resolve: {
      category: CategoryResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
