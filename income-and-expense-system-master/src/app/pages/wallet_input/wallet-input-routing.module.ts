import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletInputPage } from './wallet-input.page';

const routes: Routes = [
  {
    path: '',
    component: WalletInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletInputPageRoutingModule {}
