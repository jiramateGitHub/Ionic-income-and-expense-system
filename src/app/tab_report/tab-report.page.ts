import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab-report',
  templateUrl: 'tab-report.page.html',
  styleUrls: ['tab-report.page.scss']
})
export class TabReportPage {

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

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

}
