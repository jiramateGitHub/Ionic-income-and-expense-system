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
  public categories_name: string;
  private type_input: string;
  public username: string;
  public wallet_name: string;
  public wallet_balance : string;
  public wallet_active: string;
  
  public obj_MWallet: MWallet = {
    username: null,
    wallet_name: null,
    wallet_balance: null,
    wallet_active: null
 
  };

  public obj_MTransaction: MTransaction = {
    username : null,
    wallet_name : null,
    categorise_type : null,
    categorise_name : null,
    sub_categories_name : null,
    transaction_amount : null,
    transaction_date :null,
    transaction_note : null,
    transaction_active :null
 
  };

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private alertController: AlertController,
    
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
      this.categories_name = data['data'].name; // Here's your selected user!
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
    console.log(this.wallet_name , this.wallet_balance);
    this.obj_MWallet.wallet_name = this.wallet_name;
    this.obj_MWallet.wallet_balance = this.wallet_balance;
    this.obj_MTransaction.transaction_amount = this.wallet_balance;
    this.obj_MTransaction.transaction_note = "...";
    this.obj_MTransaction.transaction_active = "Y";
    // this.obj_MWallet.categories_name = this.categories_name;
  }
}
