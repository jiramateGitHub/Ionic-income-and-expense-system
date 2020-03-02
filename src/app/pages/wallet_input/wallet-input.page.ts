import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-wallet-input',
  templateUrl: './wallet-input.page.html',
  styleUrls: ['./wallet-input.page.scss'],
})
export class WalletInputPage implements OnInit {
  private type_input: string;
  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) { 
    this.type_input = navParams.get('type_input');
  }

  ngOnInit() {
  }

  // * @Function   : close_modal => คำสั่งปิด modal
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-02
  async close_modal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
