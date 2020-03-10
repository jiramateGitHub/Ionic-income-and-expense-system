import { ServicesService, MSubCategories } from './../../services/services.service';
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
  public obj_MSubCategories : MSubCategories = {
    id: null,
    username: null,
    categories_name: null,
    categories_type: null,
    sub_categories_name: null,
    sub_categories_active: null
  }
  public obj_MSubCategories_Income : Observable<MSubCategories[]>
  public obj_MSubCategories_Expense : Observable<MSubCategories[]>
  public obj_MCategories
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private ServicesService:ServicesService
  ) { 
    
   this.get_categories()
  }

  ngOnInit() {
  }

  // * @Function   : modal_insert_show => แสดง modal CategoryInputPage
  // * @Author     : Kessarin U-tumporn
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
  // * @Author     : Kessarin U-tumporn
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
  // * @Author     : Kessarin U-tumporn
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

  // * @Function   : get_categories => แสดงข้อมูล categories
  // * @Author     : Kessarin U-tumporn
  // * @Create Date: 2563-03-09
  get_categories(){
    //get รายรับ
    this.obj_MSubCategories.categories_type = 1;
    this.obj_MSubCategories_Income = this.ServicesService.MSubCategoriesService.get_obs_msubcategories(this.obj_MSubCategories.categories_type)
    // this.obj_MSubCategories_Income.subscribe(res => console.log(res))
    this.obj_MCategories = this.ServicesService.MCategoriesService.get_obs_mcategories(this.obj_MSubCategories.categories_type)

    //get รายจ่าย
    this.obj_MSubCategories.categories_type = 2;
    this.obj_MSubCategories_Expense = this.ServicesService.MSubCategoriesService.get_obs_msubcategories(this.obj_MSubCategories.categories_type)
    // this.obj_MSubCategories_Expense.subscribe(res => console.log(res))
  }

}
