import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionCategoryPageRoutingModule } from './transaction-category-routing.module';

import { TransactionCategoryPage } from './transaction-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionCategoryPageRoutingModule
  ],
  declarations: [TransactionCategoryPage]
})
export class TransactionCategoryPageModule {}
