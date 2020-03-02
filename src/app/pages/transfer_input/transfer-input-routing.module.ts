import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferInputPage } from './transfer-input.page';

const routes: Routes = [
  {
    path: '',
    component: TransferInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferInputPageRoutingModule {}
