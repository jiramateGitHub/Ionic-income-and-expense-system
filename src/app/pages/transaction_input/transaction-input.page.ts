import { ServicesService , MTransaction } from './../../services/services.service';
import { TransferInputPage } from './../transfer_input/transfer-input.page';
import { TransactionCategoryPage } from './../transaction_category/transaction-category.page';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController, NavParams, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-input',
  templateUrl: './transaction-input.page.html',
  styleUrls: ['./transaction-input.page.scss'],
})
export class TransactionInputPage implements OnInit {

  private type_input: string;
  public id:string;

  private  editMTransaction:MTransaction = {
    username : null,
    wallet_name : null,
    categories_type : null,
    categories_name : null,
    sub_categories_name : null,
    transaction_amount : null,
    transaction_date : null,
    transaction_note : null,
    transaction_active : null
  }

  private MTransaction:MTransaction = {
    username : null,
    wallet_name : null,
    categories_type : null,
    categories_name : null,
    sub_categories_name : null,
    transaction_amount : null,
    transaction_date : null,
    transaction_note : null,
    transaction_active : null
  }
 
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private modalController: ModalController,
    private alertController: AlertController,
    private navParams: NavParams,
    private servicesService: ServicesService,
  ) { 
      this.type_input = navParams.get('type_input');
      this.id = navParams.get('id');
      this.editMTransaction.categories_name= navParams.get('categories_name');
      this.editMTransaction.categories_type= navParams.get('categories_type');
      this.editMTransaction.sub_categories_name= navParams.get('sub_categories_name');
      this.editMTransaction.transaction_amount= navParams.get('transaction_amount');
      this.editMTransaction.transaction_active= navParams.get('transaction_active');
      this.editMTransaction.transaction_date= navParams.get('transaction_date');
      this.editMTransaction.transaction_note= navParams.get('transaction_note');
      this.editMTransaction.username= navParams.get('username');
      this.editMTransaction.wallet_name= navParams.get('wallet_name');

      console.log(this.id)
    }
 
  ngOnInit() {
  }

  // * @Function   : select_category_alert => แสดง Select สำหรับเลือก Category Type
  // * @Author     : Jiramate Phuaphan
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
          text: 'Transfer',
          cssClass: 'secondary',
          handler: () => {
            this.modal_transfer_input_show("transfer")
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
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-02
  async modal_taransaction_category_show(type: string) {
    const modal = await this.modalController.create({
      component: TransactionCategoryPage,
      componentProps: {
        'type_input': type
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      console.log(data)
      this.MTransaction.categories_type = data['data']['categories_type'];
      this.MTransaction.categories_name = data['data']['categories_name'];
      this.MTransaction.sub_categories_name = data['data']['sub_categories_name'];

      this.editMTransaction.categories_type = data['data']['categories_type'];
      this.editMTransaction.categories_name = data['data']['categories_name'];
      this.editMTransaction.sub_categories_name = data['data']['sub_categories_name'];
    });
    return await modal.present();
  }

  // * @Function   : modal_transfer_input_show => แสดง Modal TransferInputPage และ ตอนปิด Modal จะ Passing Data กลับมา
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-02
  async modal_transfer_input_show(type: string) { 
    const modal = await this.modalController.create({
      component: TransferInputPage,
      componentProps: {
        'type_input': type
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      this.MTransaction.categories_type = data['data'].categories_type
      this.MTransaction.categories_name = data['data'].categories_name
      this.MTransaction.sub_categories_name = data['data'].sub_categories_name
    });
    return await modal.present();
  }


  // * @Function   : showToast => แสดง Toast
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-01
  showToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  // * @Function   : close_modal => คำสั่งปิด modal
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-01
  async close_modal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  // * @Function   : insert_transaction => เพิ่มข้อมูล transaction
  // * @Author     : Kanathip Phithaksilp
  // * @Create Date: 2563-03-06
  async insert_transaction() {
    this.MTransaction.username = this.servicesService.SessionService.get_session_username();
    this.MTransaction.wallet_name = this.servicesService.SessionService.get_session_wallet();
    this.MTransaction.transaction_active = "Y"

    this.servicesService.MTransactionService.insert_transaction(this.MTransaction).then(() => {
      this.showToast('Insert transaction successful.');
    });
    this.close_modal();
  }

  // * @Function   : edit_transaction => เเก้ไขข้อมูล transaction
  // * @Author     : Kanathip Phithaksilp
  // * @Create Date: 2563-03-06
  async update_transaction(){
    this.editMTransaction.username = this.servicesService.SessionService.get_session_username();
    this.editMTransaction.wallet_name = this.servicesService.SessionService.get_session_wallet();
    this.editMTransaction.transaction_active = "Y"

    this.servicesService.MTransactionService.update_transaction( this.id,this.editMTransaction).then(() => {
      this.showToast('Edit transaction successful.');
    });
    this.close_modal();
  }
}
