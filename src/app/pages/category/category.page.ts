import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryInputPage } from './../category_input/category-input.page';
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  // * @Function   : modal_insert_show => แสดง modal CategoryInputPage
  // * @Author     : Kessarin
  // * @Create Date: 2563-03-01
  async modal_insert_show() {
    const modal = await this.modalController.create({
      component: CategoryInputPage,
      componentProps: {
        'type_input': 'insert'
      }
    });
    return await modal.present();
  }

}
