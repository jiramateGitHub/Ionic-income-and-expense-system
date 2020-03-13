import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryInputPageRoutingModule } from './category-input-routing.module';

import { CategoryInputPage } from './category-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryInputPageRoutingModule
  ],
  declarations: [CategoryInputPage]
})
export class CategoryInputPageModule {}
