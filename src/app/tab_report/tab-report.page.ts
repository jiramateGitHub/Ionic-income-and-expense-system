import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ServicesService, MTransaction } from '../services/services.service';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-tab-report',
  templateUrl: 'tab-report.page.html',
  styleUrls: ['tab-report.page.scss']
})
export class TabReportPage {

  public type_select: string = "day";
  public income: number = 0;
  public expent: number = 0;
  public net_income: number = 0;
  

  public obj_MTransaction: MTransaction = {
    id: null,
    username: null,
    wallet_name: null,
    categories_type: null,
    categories_name: null,
    sub_categories_name: null,
    transaction_amount: null,
    transaction_date: null,
    transaction_note: null,
    transaction_active: null
  }



  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private ServicesService: ServicesService
  ) {

    // this.obj_MTransaction.transaction_date = Date()
    

  }

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.obj_MTransaction.transaction_date = Date()
  console.log(this.obj_MTransaction.transaction_date);

  
}

  // * @Function   : selcet_report_alert => แสดง Select สำหรับเลือกประเภทรายงาน
  // * @Author     : Jiramate
  // * @Create Date: 2563-03-02
  async selcet_report_alert() {
    const alert = await this.alertController.create({
      header: 'Select time range',
      buttons: [
        {
          text: 'Day',
          cssClass: 'secondary',
          handler: () => {
            this.type_select = "day"
            // this.get_report_by_day()
          }
        },
        {
          text: 'Week',
          cssClass: 'secondary',
          handler: () => {
          }
        },
        {
          text: 'Month',
          cssClass: 'secondary',
          handler: () => {
            this.type_select = "month"
            // this.get_report_by_month()
          }
        },
        {
          text: 'Year',
          cssClass: 'secondary',
          handler: () => {
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


  // * @Function   : get_report_by_day => แสดงข้อมูลรายรับ-รายจ่าย เป็นวัน
  // * @Author     : Sathien Supabkul
  // * @Create Date: 2563-03-09
  get_report_by_day() {
    // console.log(this.date)
    // console.log(this.obj_MTransaction.transaction_date.substr(0,10))
    this.ServicesService.MTransactionService.get_obs_mtransaction(this.obj_MTransaction).subscribe(async res => {

      console.log("da", this.obj_MTransaction.transaction_date.substr(0, 10))
      var sum_income = 0;
      var sum_expent = 0;
      //console.log(this.obj_MTransaction);
      //var str = this.obj_MTransaction.transaction_date.substr(0,10)
      //var date = str.split("-");
      for (var i = 0; i < res.length; i++) {
        if (res[i].categories_type == 1) {
          if (this.obj_MTransaction.transaction_date.substr(0, 10) == res[i].transaction_date.substr(0, 10)) {

            console.log(res[i].transaction_amount);
            sum_income += +res[i].transaction_amount;

          }
        } else if(res[i].categories_type == 2){
          if (this.obj_MTransaction.transaction_date.substr(0, 10) == res[i].transaction_date.substr(0, 10)) {

            console.log(res[i].transaction_amount);
            sum_expent += +res[i].transaction_amount;

          }
        }

      }

      this.income = sum_income;
      this.expent = sum_expent;

      if(sum_income >= sum_expent){
        this.net_income = sum_income - sum_expent
      }else if(sum_income <= sum_expent){
        this.net_income = sum_income - sum_expent
      }

      


      //console.log("da",date);
      //console.log("str",str);
      // console.log(res[0].transaction_date.substr(0,10));
      //  console.log(this.obj_MTransaction);



    });
  }


  // * @Function   : get_report_by_day => แสดงข้อมูลรายรับ-รายจ่าย เป็นวัน
  // * @Author     : Sathien Supabkul
  // * @Create Date: 2563-03-09
  get_report_by_month() {
    // console.log(this.date)
    // console.log(this.obj_MTransaction.transaction_date.substr(0,10))
    this.ServicesService.MTransactionService.get_obs_mtransaction(this.obj_MTransaction).subscribe(async res => {

      var sum_income = 0;
      var sum_expent = 0;
      //console.log(this.obj_MTransaction);
      //var str = this.obj_MTransaction.transaction_date.substr(0,10)
      //var date = str.split("-");
      for (var i = 0; i < res.length; i++) {
        if (res[i].categories_type == 1) {
          if (this.obj_MTransaction.transaction_date.substr(0, 8) == res[i].transaction_date.substr(0, 8)) {

            console.log(res[i].transaction_amount);
            sum_income += +res[i].transaction_amount;

          }
        } else if(res[i].categories_type == 2){
          if (this.obj_MTransaction.transaction_date.substr(0, 8) == res[i].transaction_date.substr(0, 8)) {

            console.log(res[i].transaction_amount);
            sum_expent += +res[i].transaction_amount;

          }
        }

      }
      this.income = sum_income;
      this.expent = sum_expent;

      if(sum_income >= sum_expent){
        this.net_income = sum_income - sum_expent
      }else if(sum_income <= sum_expent){
        this.net_income = sum_income - sum_expent
      }
    });
  }




  // * @Function   : get_report_by_year => แสดงข้อมูลรายรับ-รายจ่าย เป็นปี
  // * @Author     : Peeranat Buranarek
  // * @Create Date: 2563-03-10
  get_report_by_year() {
    this.ServicesService.MTransactionService.get_obs_mtransaction(this.obj_MTransaction).subscribe(async res => {
      console.log("da", this.obj_MTransaction.transaction_date.substr(0, 4))
      var total_year: number = 0;
      for (var i = 0; i < res.length; i++) {
        if (this.obj_MTransaction.transaction_date.substr(0, 4) == res[i].transaction_date.substr(0, 4)) {
          total_year += +res[i].transaction_amount;
        }
      }
      this.income = total_year;
    });
  }

}