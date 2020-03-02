import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ModalController, AlertController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-transaction-category',
  templateUrl: './transaction-category.page.html',
  styleUrls: ['./transaction-category.page.scss'],
})
export class TransactionCategoryPage implements OnInit {
  private type_input: string;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private toastController: ToastController, 
    private modalController: ModalController,
    private alertController: AlertController,
    private navParams: NavParams,
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
