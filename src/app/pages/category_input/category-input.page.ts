import { ServicesService, MSubCategories , MTransaction } from './../../services/services.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams, AlertController } from '@ionic/angular';
import { TransactionCategoryPage } from './../transaction_category/transaction-category.page';
// import { ServicesService, MTransaction} from '../../services/services.service';
@Component({
  selector: 'app-category-input',
  templateUrl: './category-input.page.html',
  styleUrls: ['./category-input.page.scss'],
})
export class CategoryInputPage implements OnInit {
  
  private type_input: string;
  private type_parent_categories : string;
  public obj_MSubCategories: MSubCategories= {
    username: null,
    categories_name: null,
    categories_type: null,
    sub_categories_name: null,
    sub_categories_active: null
  }
  constructor(
    private navParams: NavParams,
    private toastController: ToastController, 
    private modalController: ModalController,
    private alertController: AlertController,
    private ServicesService: ServicesService
  ) { 
    this.type_input = navParams.get('type_input');
    if(this.type_input == "update"){
      this.get_categories_by_id(navParams.get('id'))
    }
  }

  ngOnInit() {
  }

// * @Function   : modal_taransaction_category_show => แสดง Modal TransactionCategoryPage และ ตอนปิด Modal จะ Passing Data กลับมา
// * @Author     : Thananya
// * @Create Date: 2563-03-02
async modal_taransaction_category_show() {
  if(this.type_parent_categories == null || this.type_parent_categories == ""){
    this.showToast('Please select categories type.');
  }else{
    const modal = await this.modalController.create({
      component: TransactionCategoryPage,
      componentProps: {
        'type_input': this.type_parent_categories
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      this.obj_MSubCategories.categories_name = data['data'].categories_name; // Here's your selected user!
      this.obj_MSubCategories.categories_type = data['data'].categories_type;
    });
    return await modal.present();
  }
}

  // * @Function   : close_modal => คำสั่งปิด modal
  // * @Author     : Kessarin
  // * @Create Date: 2563-03-02
  async close_modal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  // * @Function   : get_categories_by_id => คำสั่ง get 
  // * @Author     : Thananya Banchuenwijit
  // * @Create Date: 2563-03-09
  get_categories_by_id(id){
   this.ServicesService.MSubCategoriesService.get_obs_msubcategories_by_id(id).subscribe( async res => {
    this.obj_MSubCategories = res
    if(res.categories_type == 1){
      this.type_parent_categories = "parent_income"
    }else if(res.categories_type == 2){
      this.type_parent_categories = "parent_expense"
    }
   })
  }

  // * @Function   : insert_categories => คำสั่งเพิ่ม sub_categories
  // * @Author     : Thananya Banchuenwijit
  // * @Create Date: 2563-03-09
  insert_categories(){
    if(this.obj_MSubCategories.sub_categories_name == null || this.obj_MSubCategories.sub_categories_name == ""){
      this.showToast('Please fill in Category name.');
    }else if(this.obj_MSubCategories.categories_name == null || this.obj_MSubCategories.categories_name == ""){
      this.showToast('Please select parent category');
    }else{
      this.obj_MSubCategories.username = this.ServicesService.SessionService.get_session_username()
      this.obj_MSubCategories.sub_categories_active = "Y"
      this.ServicesService.MSubCategoriesService.insert_sub_categories(this.obj_MSubCategories)
      this.showToast("Add Categories Success");
      this.close_modal()
    }
    
  }

  // * @Function   : update_categories => คำสั่งแก้ไข sub_categories
  // * @Author     : Thananya Banchuenwijit
  // * @Create Date: 2563-03-09
  update_categories(){
    if(this.obj_MSubCategories.sub_categories_name == null || this.obj_MSubCategories.sub_categories_name == ""){
      this.showToast('Please fill in Category name.');
    }else if(this.obj_MSubCategories.categories_name == null || this.obj_MSubCategories.categories_name == ""){
      this.showToast('Please select parent category');
    }else{
      this.obj_MSubCategories.username = this.ServicesService.SessionService.get_session_username()
      this.obj_MSubCategories.sub_categories_active = "Y"
      this.ServicesService.MSubCategoriesService.update_sub_categories(this.obj_MSubCategories)
      this.showToast("Update Categories Success");
      this.close_modal()
    }
  }

  // * @Function   : delete_categories => คำสั่งลบ sub_categories
  // * @Author     : Thananya Banchuenwijit
  // * @Create Date: 2563-03-09
  delete_categories(){
    this.obj_MSubCategories.username = this.ServicesService.SessionService.get_session_username()
    this.obj_MSubCategories.sub_categories_active = "Y"
    this.ServicesService.MSubCategoriesService.update_sub_categories(this.obj_MSubCategories)
    this.showToast("Delete Categories Success");
  }

  // * @Function   : showToast => คำสั่งแสดงข้อความ
  // * @Author     : Thananya Banchuenwijit
  // * @Create Date: 2563-03-09
  showToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
