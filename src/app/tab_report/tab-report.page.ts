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
    public obj_MTransaction:MTransaction = {
    id: null,
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
    private modalController: ModalController,
    private alertController: AlertController,
    private ServicesService : ServicesService
  ) {
    this.get_report_by_day()
  }

// * @Function   : selcet_report_alert => แสดง Select สำหรับเลือกประเภทรายงาน
// * @Author     : Jiramate
// * @Create Date: 2563-03-02
async selcet_report_alert(){
  const alert = await this.alertController.create({
    header: 'Select time range',
    buttons: [
      {
        text: 'Day',
        cssClass: 'secondary',
        handler: () => {
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

// * @Function   : get_report => แสดงข้อมูลรายรับ-รายจ่าย เป็นวัน
// * @Author     : Sathien Supabkul
// * @Create Date: 2563-03-09
get_report_by_day(){
  this.ServicesService.MTransactionService.get_obs_mtransaction(this.obj_MTransaction).subscribe(async res => {
    console.log(res[0].transaction_date);
    console.log(new Date(1583485800))
  });
}

formatDate(date:Date) :string{
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return year+'-'+month+'-'+day
}

}
