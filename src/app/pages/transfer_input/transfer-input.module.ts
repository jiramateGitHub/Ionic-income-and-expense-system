import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferInputPageRoutingModule } from './transfer-input-routing.module';

import { TransferInputPage } from './transfer-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferInputPageRoutingModule
  ],
  declarations: [TransferInputPage]
})
export class TransferInputPageModule {}
