import { MCategoriesService} from './../../services/m_categories/m-categories.service';
import { Component, OnInit } from '@angular/core';
import { CategoryInputPage } from './../category_input/category-input.page';
import { ModalController, ToastController, NavParams, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private mCategoriesService:MCategoriesService
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

  // * @Function   : modal_update_show => แสดง modal CategoryInputPage
  // * @Author     : Kessarin
  // * @Create Date: 2563-03-01
  async modal_update_show() {
    const modal = await this.modalController.create({
      component: CategoryInputPage,
      componentProps: {
        'type_input': 'update'
      }
    });
    return await modal.present();
  }

  // * @Function   : category_manage_alert => แสดง Select สำหรับเลือกตัวดำเนินการ Category 
  // * @Author     : Kessarin
  // * @Create Date: 2563-03-02
  async category_manage_alert(){
    const alert = await this.alertController.create({
      header: 'Manage Category',
      buttons: [
        {
          text: 'Edit',
          cssClass: 'secondary',
          handler: () => {
            this.modal_update_show();
          }
        },
        {
          text: 'Delete',
          cssClass: 'secondary',
          handler: () => {
            this.category_active_update_AlertConfirm();
          }
        },
        {
          text: 'Cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

  async category_active_update_AlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm Delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Confirm',
          handler: () => {
            
          }
        }
      ]
    });

    await alert.present();
  }

}
