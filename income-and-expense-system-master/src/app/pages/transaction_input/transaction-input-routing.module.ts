import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionInputPage } from './transaction-input.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionInputPageRoutingModule {}
