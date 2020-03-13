import { TransactionInputPage } from '../pages/transaction_input/transaction-input.page';
import { SessionService } from './../services/session/session.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  
  constructor(
    private SessionService:SessionService, 
    private router:Router,
    private modalController: ModalController,
    ) {
    // if(this.SessionService.password == undefined){
    //   this.router.navigateByUrl('signin');
    // }
  }

  // * @Function   : modal_insert_show => แสดง modal TransactionInputPage
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-01
  async modal_insert_show() {
    const modal = await this.modalController.create({
      component: TransactionInputPage,
      componentProps: {
        'type_input': 'insert'
      }
    });
    return await modal.present();
  }

}
