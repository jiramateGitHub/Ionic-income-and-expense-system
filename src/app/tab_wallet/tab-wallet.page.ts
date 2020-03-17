import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { ServicesService, MTransaction, MWallet } from '../services/services.service';
import { TransactionInputPage } from '../pages/transaction_input/transaction-input.page';
import { Pipe, PipeTransform } from '@angular/core';
// import {MatSortModule} from '@angular/material/sort';
@Component({
  selector: 'app-tab-wallet',
  templateUrl: 'tab-wallet.page.html',
  styleUrls: ['tab-wallet.page.scss']
})
@Pipe({
  name: 'groupBy',
})
export class TabWalletPage implements OnInit {

  public income: number;
  public outcome: number;

  public all_date_transaction = []
  public obj_wallet = []
  public all_transaction = [];
  public edit_transaction: any;

  public obj_transaction: MTransaction = {
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
    private router: Router,
    public modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private servicesService: ServicesService
  ) {
    this.income = 0;
    this.outcome = 0;
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.obj_transaction  = {
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
    this.all_date_transaction = []
    this.obj_wallet = []
    this.all_transaction = [];
    this.obj_transaction.username = this.servicesService.SessionService.get_session_username();
    this.get_all_transaction_show();
    this.get_wallet_balance()
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    this.obj_transaction.username = this.servicesService.SessionService.get_session_username();
    this.get_all_transaction_show();
    this.get_wallet_balance()
  }

  // * @Function   : modal_edit_show => Modal edit
  // * @Author     : Kanathip Phithaksilp
  // * @Create Date: 2563-03-06
  async modal_edit_show(id: string) {
    await this.servicesService.MTransactionService.get_edit_transaction(id).subscribe(async res => {
      this.edit_transaction = res;
      const modal = await this.modalController.create({
        component: TransactionInputPage,
        componentProps: {
          'type_input': 'update',
          'id': id,
          'categories_name': this.edit_transaction.categories_name,
          'categories_type': this.edit_transaction.categories_type,
          'sub_categories_name': this.edit_transaction.sub_categories_name,
          'transaction_amount': this.edit_transaction.transaction_amount,
          'transaction_active': this.edit_transaction.transaction_active,
          'transaction_date': this.edit_transaction.transaction_date,
          'transaction_note': this.edit_transaction.transaction_note,
          'username': this.edit_transaction.username,
          'wallet_name': this.edit_transaction.wallet_name
        }
      });
      return await modal.present();
    })
  }

  // * @Function   : transaction_active_update_AlertConfirm => แจ้งเตือนการลบ
  // * @Author     : Kanathip Phithaksilp
  // * @Create Date: 2563-03-06
  async transaction_active_update_AlertConfirm(id: string, amount: number, type: number) {
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
            if (type == 3 || type == 4) {
              this.showToast("Can't delete transaction.")
            } else {
              this.delete_transaction(id)
              this.update_wallet_balance(amount, type, true)
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // * @Function   : get_all_transaction_show => ดึงข้อมูล Transaction มาแสดง
  // * @Author     : Kanathip Phithaksilp
  // * @Create Date: 2563-03-06
  get_all_transaction_show() {
    this.all_date_transaction = []
    this.servicesService.MTransactionService.get_all_transaction_show().subscribe(res => {
      this.all_transaction = res;
      for (var i = 0; i < res.length; i++) {
        this.all_transaction[i].transaction_date = this.all_transaction[i].transaction_date.substr(0, 10)
      }

      var temp = res
      temp.sort((one, two) => (one.transaction_date.substr(0, 10) > two.transaction_date.substr(0, 10) ? -1 : 1));
      var temp_all_date_transaction = []
      
      if (temp.length == 1) {
        temp_all_date_transaction.push(temp[0].transaction_date)
      } else {
        for (var i = 0; i < temp.length; i++) {
          if (i == 0) {
            temp_all_date_transaction.push(temp[i].transaction_date)
          } else {
            if (temp[i - 1].transaction_date != temp[i].transaction_date) {
              temp_all_date_transaction.push(temp[i].transaction_date)
            }
          }
          // if (i == (temp.length - 1)) {
          //   if (temp[i - 1].transaction_date != temp[i].transaction_date) {
          //     temp_all_date_transaction.push(temp[i].transaction_date)
          //   }
          // }
        }
      }
      
      if(res.length != 0){
        for (var i = 0; i < temp_all_date_transaction.length; i++) {
       
            this.all_date_transaction[i] = 
            {
              date: null,
              month: null,
              year: null,
              day:null,
              amount : null
            }

          this.all_date_transaction[i].date = temp_all_date_transaction[i]
          this.all_date_transaction[i].year = temp_all_date_transaction[i].substr(0, 4);
          this.all_date_transaction[i].day =temp_all_date_transaction[i].substr(8, 2);
  
          if (temp_all_date_transaction[i].substr(5, 2) == "01") {
            this.all_date_transaction[i].month = "Jan";
  
          } else if (temp_all_date_transaction[i].substr(5, 2) == "02") {
            this.all_date_transaction[i].month = "Feb";
  
          } else if (temp_all_date_transaction[i].substr(5, 2) == "03") {
  
            this.all_date_transaction[i].month = "Mar";
  
          } else if (temp_all_date_transaction[i].substr(5, 2) == "04") {
            this.all_date_transaction[i].month = "Apr";
  
          } else if (temp_all_date_transaction[i].substr(5, 2) == "05") {
            this.all_date_transaction[i].month = "May";
  
          } else if (temp_all_date_transaction[i].substr(5, 2) == "06") {
            this.all_date_transaction[i].month = "Jun";
  
          } else if (temp_all_date_transaction[i].substr(5, 2) == "07") {
            this.all_date_transaction[i].month = "Jul";
  
          } else if (temp_all_date_transaction[i].substr(5, 2) == "08") {
            this.all_date_transaction[i].month = "Aug";
  
          } else if (temp_all_date_transaction[i].substr(5, 2) == "09") {
            this.all_date_transaction[i].month = "Sep";
  
          } else if (temp_all_date_transaction[i].substr(5, 2) == "10") {
            this.all_date_transaction[i].month = "Oct";
  
          } else if (temp_all_date_transaction[i].substr(5, 2) == "11") {
            this.all_date_transaction[i].month = "Nov";
            
          } else if (temp_all_date_transaction[i].substr(5, 2) == "12") {
            this.all_date_transaction[i].month = "Dec";
          }
  
        } //for

        this.income = 0;
        this.outcome = 0;
        for (var j = 0; j < temp_all_date_transaction.length; j++) {
          for (var k = 0; k < temp.length; k++) {
            if(this.all_date_transaction[j].date == temp[k].transaction_date.substr(0,10)){
              if(temp[k].categories_type == 1 || temp[k].categories_type == 4){
                this.income += temp[k].transaction_amount
              }else if(temp[k].categories_type == 2 || temp[k].categories_type ==3){
                this.outcome += temp[k].transaction_amount
              }
            }
          }

          this.all_date_transaction[j].amount = this.income - this.outcome;
          this.income = 0;
          this.outcome = 0;
        }
        console.log( this.all_date_transaction)
      } //if
      
    })

  }

  // * @Function   : sortData => เรียงข้อมูลตามเวลา
  // * @Author     : Kanathip Phithaksilp
  // * @Create Date: 2563-03-06
  public get sortData() {
    return this.all_transaction.sort((a, b) => {
      return <any>new Date(b.transaction_date) - <any>new Date(a.transaction_date);
    });
  }


  // * @Function   : delete_transaction => ลบข้อมูล Transaction 
  // * @Author     : Thanpisit Suetrong
  // * @Create Date: 2563-03-11
  delete_transaction(id: string) {
    this.servicesService.MTransactionService.delete_transaction(id)
    this.showToast("Delete successful.")
    this.obj_transaction.username = this.servicesService.SessionService.get_session_username();
    this.get_all_transaction_show();
    this.get_wallet_balance()
  }

  // * @Function   : showToast => ใช้แสดง Toast
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-011
  showToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }


  get_wallet_balance() {
    this.servicesService.MWalletService.get_wallet_balance().subscribe(res => {
      this.obj_wallet = res['0'];
    });

  }

  // * @Function   : update_wallet_balance => อัพเดทเงินในกระเป๋า
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-16
  update_wallet_balance(amount: number, type: number, check_update) {
    this.servicesService.MWalletService.get_wallet_balance().subscribe(res => {
      if (check_update == true) {
        if (type == 1) {
          var balance = res[0].wallet_balance - amount
        } else if (type == 2) {
          var balance = res[0].wallet_balance + amount
        }
        var temp: MWallet = {
          username: res[0].username,
          wallet_active: res[0].wallet_active,
          wallet_balance: balance,
          wallet_name: res[0].wallet_name
        }
        this.servicesService.MWalletService.update_wallet_name(res[0].id, temp)
        check_update = false
      }
    });

  }

}
