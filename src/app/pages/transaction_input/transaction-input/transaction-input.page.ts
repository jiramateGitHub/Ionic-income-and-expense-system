import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-transaction-input',
  templateUrl: './transaction-input.page.html',
  styleUrls: ['./transaction-input.page.scss'],
})
export class TransactionInputPage implements OnInit {
  private type_input: string;

  constructor( 
    private modalController: ModalController,
    private toastController:ToastController,
    navParams: NavParams) 
  {
    this.type_input = navParams.get('type_input')
  }

  ngOnInit() {
  }


  async close_modal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
