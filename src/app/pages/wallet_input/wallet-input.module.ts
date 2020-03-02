import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletInputPageRoutingModule } from './wallet-input-routing.module';

import { WalletInputPage } from './wallet-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletInputPageRoutingModule
  ],
  declarations: [WalletInputPage]
})
export class WalletInputPageModule {}
