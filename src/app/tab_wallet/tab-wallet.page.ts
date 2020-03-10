import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ServicesService , MTransaction } from '../services/services.service';
import { TransactionInputPage } from '../pages/transaction_input/transaction-input.page';
@Component({
  selector: 'app-tab-wallet',
  templateUrl: 'tab-wallet.page.html',
  styleUrls: ['tab-wallet.page.scss']
})
export class TabWalletPage {

  public obj_transaction:MTransaction = {
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

  public all_transaction:any;
  public edit_transaction:any;

  constructor(
    private router: Router,
    public modalController: ModalController,
    private servicesService: ServicesService
    ){
      this.obj_transaction.username = this.servicesService.SessionService.get_session_username();
      this.get_all_transaction_show();
  } 
  
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async modal_edit_show(id:string) {
    
    await this.servicesService.MTransactionService.get_edit_transaction(id).subscribe( async res => {
      this.edit_transaction = res;
      const modal = await this.modalController.create({
        component: TransactionInputPage,
        componentProps: {
          'type_input': 'update',
          'id': id,
          'categories_name':this.edit_transaction.categories_name,
          'categories_type':this.edit_transaction.categories_type,
          'sub_categories_name':this.edit_transaction.sub_categories_name,
          'transaction_amount':this.edit_transaction.transaction_amount,
          'transaction_active':this.edit_transaction.transaction_active,
          'transaction_date':this.edit_transaction.transaction_date,
          'transaction_note':this.edit_transaction.transaction_note,
          'username':this.edit_transaction.username,
          'wallet_name':this.edit_transaction.wallet_name
        }
      });
      return await modal.present();
    })
  }

  // * @Function   : get_all_transaction_show => ดึงข้อมูล Transaction มาแสดง
  // * @Author     : Kanathip Phithaksilp
  // * @Create Date: 2563-03-06
  async get_all_transaction_show(){

      this.servicesService.MTransactionService.get_all_transaction_show().subscribe( res => {
      this.all_transaction = res;
      console.log( this.all_transaction)

   })
   
  }
  // * @Function   : delete_transaction => ลบข้อมูล Transaction 
  // * @Author     : Thanpisit Suetrong
  // * @Create Date: 2563-03-11
   delete_transaction(id:string){
    this.servicesService.MTransactionService.delete_transaction(id)
  }

  
}
