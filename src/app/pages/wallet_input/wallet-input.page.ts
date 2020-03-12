import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams, AlertController } from '@ionic/angular';
import { TransactionCategoryPage } from './../transaction_category/transaction-category.page';
import { ServicesService, MWallet, MTransaction } from '../../services/services.service';

@Component({
  selector: 'app-wallet-input',
  templateUrl: './wallet-input.page.html',
  styleUrls: ['./wallet-input.page.scss'],
})
export class WalletInputPage implements OnInit {
  private type_input: string;
  private id:string;

  private  edit_MWallet:MWallet = {
    username: null,
    wallet_name: null,
    wallet_balance : null,
    wallet_active: null
  }

  public obj_MWallet: MWallet = {
    username: null,
    wallet_name: null,
    wallet_balance: null,
    wallet_active: null
  };

  public obj_MTransaction: MTransaction = {
    username: null,
    wallet_name: null,
    categories_type: null,
    categories_name: null,
    sub_categories_name: null,
    transaction_amount: null,
    transaction_date: null,
    transaction_note: null,
    transaction_active: null
  };

  constructor(
    private ToastController:ToastController,
    private navParams: NavParams,
    private modalController: ModalController,
    private alertController: AlertController,
    private ServicesService: ServicesService

  ) {
    this.type_input = navParams.get('type_input');
    this.id = navParams.get('id');
    this.edit_MWallet.username = navParams.get('username');
    this.edit_MWallet.wallet_name = navParams.get('wallet_name');
    this.edit_MWallet.wallet_balance = navParams.get('wallet_balance');
    this.edit_MWallet.wallet_active = navParams.get('wallet_active');
  }

  ngOnInit() {
  }

  // * @Function   : select_category_alert => แสดง Select สำหรับเลือก Category Type
  // * @Author     : Netchanok
  // * @Create Date: 2563-03-02
  async select_category_alert() {
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
  async modal_taransaction_category_show(type: string) {
    const modal = await this.modalController.create({
      component: TransactionCategoryPage,
      componentProps: {
        'type_input': type,
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data)
        this.obj_MTransaction.sub_categories_name = data['data']['sub_categories_name']; // Here's your selected user!
        this.obj_MTransaction.categories_type = data['data']['categories_type'];
        this.obj_MTransaction.categories_name = data['data']['categories_name'];
      });
    return await modal.present();
  }

  // * @Function   : close_modal => คำสั่งปิด modal
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-02
  async close_modal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  showToast(msg) {
    this.ToastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
  // * @Function   : insert_model => เพิ่มกระเป๋าเงิน
  // * @Author     : Netchanok Thaintin
  // * @Create Date: 2563-03-09
  async insert_wallet() {
    this.obj_MWallet.username = this.ServicesService.SessionService.get_session_username();
    this.obj_MTransaction.username = this.ServicesService.SessionService.get_session_username();
    this.obj_MTransaction.transaction_note = "New Wallet";
    this.obj_MTransaction.transaction_active = "Y";
    this.obj_MWallet.wallet_active = "Y";

    this.ServicesService.MTransactionService.insert_transaction(this.obj_MTransaction)
    this.ServicesService.MWalletService.insert_wallet(this.obj_MWallet)
    this.showToast('Add Wallet successful.');

    this.close_modal();
  }

  // * @Function   : update_wallet_name => แก้ไขชื่อ wallet
  // * @Author     : Netchanok Thaintin
  // * @Create Date: 2563-03-09
  async update_wallet_name(){
    this.edit_MWallet.username = this.ServicesService.SessionService.get_session_username();
    this.edit_MWallet.wallet_name = this.edit_MWallet.wallet_name;
  
    this.ServicesService.MWalletService.update_wallet_name(this.id,this.edit_MWallet).then(() => {
      this.showToast('Edit Wallet successful.');
    });
    this.close_modal();
  }
}
