import { WalletInputPage } from './../wallet_input/wallet-input.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  constructor(
    private router:Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  // * @Function   : modal_insert_show => แสดง modal TransactionInputPage
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-01
  async modal_insert_show() {
    const modal = await this.modalController.create({
      component: WalletInputPage,
      componentProps: {
        'type_input': 'insert'
      }
    });
    return await modal.present();
  }

}
