import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionInputPageRoutingModule } from './transaction-input-routing.module';

import { TransactionInputPage } from './transaction-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionInputPageRoutingModule
  ],
  declarations: [TransactionInputPage]
})
export class TransactionInputPageModule {}
