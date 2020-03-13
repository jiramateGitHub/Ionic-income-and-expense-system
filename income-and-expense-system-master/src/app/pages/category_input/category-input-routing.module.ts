import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryInputPage } from './category-input.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryInputPageRoutingModule {}
