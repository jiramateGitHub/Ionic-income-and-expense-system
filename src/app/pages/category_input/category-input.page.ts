import { ServicesService, MSubCategories } from './../../services/services.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams, AlertController } from '@ionic/angular';
import { TransactionCategoryPage } from './../transaction_category/transaction-category.page';
@Component({
  selector: 'app-category-input',
  templateUrl: './category-input.page.html',
  styleUrls: ['./category-input.page.scss'],
})
export class CategoryInputPage implements OnInit {
  
  private type_input: string;
  private type_parent_categorise : string;
  public obj_MSubCategories: MSubCategories= {
    id : null,
    username: null,
    categorise_name: null,
    categorise_type: null,
    sub_categories_name: null,
    sub_categorise_active: null
  }
  constructor(
    private navParams: NavParams,
    private toastController: ToastController, 
    private modalController: ModalController,
    private alertController: AlertController,
    private ServicesService: ServicesService
  ) { 
    this.type_input = navParams.get('type_input');
  }

  ngOnInit() {
  }

// * @Function   : modal_taransaction_category_show => แสดง Modal TransactionCategoryPage และ ตอนปิด Modal จะ Passing Data กลับมา
// * @Author     : Thananya
// * @Create Date: 2563-03-02
async modal_taransaction_category_show() {
  const modal = await this.modalController.create({
    component: TransactionCategoryPage,
    componentProps: {
      'type_input': this.type_parent_categorise
    }
  });
  modal.onDidDismiss()
  .then((data) => {
    this.obj_MSubCategories.categorise_name = data['data'].name; // Here's your selected user!
    this.obj_MSubCategories.categorise_type = data['data'].type;
  });
  return await modal.present();
}

  // * @Function   : close_modal => คำสั่งปิด modal
  // * @Author     : Kessarin
  // * @Create Date: 2563-03-02
  async close_modal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  // * @Function   : insert_categories => คำสั่งเพิ่ม sub_categories
  // * @Author     : Thananya Banchuenwijit
  // * @Create Date: 2563-03-09
  insert_categories(){
    this.obj_MSubCategories.username = this.ServicesService.SessionService.get_session_username()
    this.obj_MSubCategories.sub_categorise_active = "Y"
    this.ServicesService.MSubCategoriesService.
    //console.log(this.obj_MSubCategories)
  }

}
