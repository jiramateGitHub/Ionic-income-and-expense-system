import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams, AlertController } from '@ionic/angular';
import { TransactionCategoryPage } from './../transaction_category/transaction-category.page';
import { ServicesService, MWallet , MTransaction} from '../../services/services.service';

@Component({
  selector: 'app-wallet-input',
  templateUrl: './wallet-input.page.html',
  styleUrls: ['./wallet-input.page.scss'],
})
export class WalletInputPage implements OnInit {
  private type_input: string;

  public obj_MWallet: MWallet = {
    username: null,
    wallet_name: null,
    wallet_balance: null,
    wallet_active: null
 
  };

  public obj_MTransaction: MTransaction = {
    username : null,
    wallet_name : null,
    categories_type : null,
    categories_name : null,
    sub_categories_name : null,
    transaction_amount : null,
    transaction_date : null,
    transaction_note : null,
    transaction_active : null
 
  };

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private alertController: AlertController,
    private ServicesService:ServicesService
    
  ) { 
    this.type_input = navParams.get('type_input');
  }

  ngOnInit() {
  }

  // * @Function   : select_category_alert => แสดง Select สำหรับเลือก Category Type
  // * @Author     : Netchanok
  // * @Create Date: 2563-03-02
  async select_category_alert(){
    const alert = await this.alertController.create({
      header: 'Select Category',
      buttons: [
        {
          text: 'Income',
          cssClass: 'secondary',
          handler: () => {
            this.modal_taransaction_category_show("income")
          }
        },
        {
          text: 'Expense',
          cssClass: 'secondary',
          handler: () => {
            this.modal_taransaction_category_show("expense")
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

  // * @Function   : modal_taransaction_category_show => แสดง Modal TransactionCategoryPage และ ตอนปิด Modal จะ Passing Data กลับมา
  // * @Author     : Netchanok
  // * @Create Date: 2563-03-02
  async modal_taransaction_category_show(type:string) {
    const modal = await this.modalController.create({
      component: TransactionCategoryPage,
      componentProps: {
        'type_input': type
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      console.log(data)
      this.obj_MTransaction.sub_categories_name = data['data']['sub_categories_name']; // Here's your selected user!
    });
    return await modal.present();
  }

  // * @Function   : close_modal => คำสั่งปิด modal
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-02
  async close_modal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  // * @Function   : insert_model => เพิ่มกระเป๋าเงิน
  // * @Author     : Netchanok Thaintin
  // * @Create Date: 2563-03-09
  async insert_wallet(){
    this.obj_MWallet.wallet_name = this.ServicesService.SessionService.get_session_wallet()

    this.obj_MTransaction.username = this.ServicesService.SessionService.get_session_username()
    this.obj_MTransaction.wallet_name = this.ServicesService.SessionService.get_session_wallet()
    this.obj_MTransaction.transaction_note = "...";
    this.obj_MTransaction.transaction_active = "Y";
    // this.obj_MWallet.categories_name = this.categories_name;
  }
}
