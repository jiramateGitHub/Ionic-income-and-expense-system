import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams, AlertController } from '@ionic/angular';
import { TransactionCategoryPage } from './../transaction_category/transaction-category.page';
import { ServicesService, MTransaction} from '../../services/services.service';
@Component({
  selector: 'app-category-input',
  templateUrl: './category-input.page.html',
  styleUrls: ['./category-input.page.scss'],
})
export class CategoryInputPage implements OnInit {
  private type_input: string;
  private category_type: string;
  public category_name: string;
   

  constructor(
    private navParams: NavParams,
    private toastController: ToastController, 
    private modalController: ModalController,
    private alertController: AlertController,
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
      'type_input': this.category_type
    }
  });
  modal.onDidDismiss()
  .then((data) => {
    this.category_name = data['data'].name; // Here's your selected user!
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

}
