import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionCategoryPage } from './transaction-category.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionCategoryPageRoutingModule {}
