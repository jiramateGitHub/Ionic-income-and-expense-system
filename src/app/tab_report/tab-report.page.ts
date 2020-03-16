import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ServicesService, MTransaction } from '../services/services.service';
import { SessionService } from '../services/session/session.service';
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
    private SessionService: SessionService,
    private modalController: ModalController,
    private alertController: AlertController,
    private ServicesService: ServicesService
  ) {

    this.obj_MTransaction.transaction_date = Date()

    this.get_report_by_day()

  }

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  // this.obj_MTransaction.transaction_date = Date()
  var date = Date()
  console.log(date)
  var month = date.substr(4,3)
  var day = date.substr(8,2)
  var year = date.substr(11,4)
  var month_num;
 
  if(month == "Jan"){
    month_num = "01" ; 
  }else if(month == "Feb"){
    month_num = "02" ;
  }else if(month == "Mar"){
    month_num = "03" ;
  }else if(month == "Apr"){
    month_num = "04" ;
  }else if(month == "May"){
    month_num = "05" ;
  }else if(month == "Jun"){
    month_num = "06" 
  }else if(month == "Jul"){
    month_num = "07" 
  }else if(month == "Aug"){
    month_num = "08" 
  }else if(month == "Sep"){
    month_num = "09" 
  }else if(month == "Oct"){
    month_num = "10" 
  }else if(month == "Nov"){
    month_num = "11" 
  }else if(month == "Dec"){
    month_num = "12" 
  }

  this.obj_MTransaction.transaction_date = year + "-" + month_num + "-" + day;
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
          text: 'Daily',
          cssClass: 'secondary',
          handler: () => {
            this.type_select = "day"
            // this.get_report_by_day()
          }
        },
        {
          text: 'Monthly',
          cssClass: 'secondary',
          handler: () => {
            this.type_select = "month"
            // this.get_report_by_month()
          }
        },
        {
          text: 'Yearly',
          cssClass: 'secondary',
          handler: () => {
            this.type_select = "year"
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


  // * @Function   : get_report_by_month => แสดงข้อมูลรายรับ-รายจ่าย เป็นเดือน
  // * @Author     : Sathien Supabkul
  // * @Create Date: 2563-03-15
  get_report_by_month() {
    this.ServicesService.MTransactionService.get_obs_mtransaction(this.obj_MTransaction).subscribe(async res => {

      var sum_income = 0;
      var sum_expent = 0;
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
      var sum_income = 0;
      var sum_expent = 0;
      for (var i = 0; i < res.length; i++) {
        if (res[i].categories_type == 1) {
          if (this.obj_MTransaction.transaction_date.substr(0, 4) == res[i].transaction_date.substr(0, 4)) {

            console.log(res[i].transaction_amount);
            sum_income += +res[i].transaction_amount;

          }
        } else if(res[i].categories_type == 2){
          if (this.obj_MTransaction.transaction_date.substr(0, 4) == res[i].transaction_date.substr(0, 4)) {

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

}