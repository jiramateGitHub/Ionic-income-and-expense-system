import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ModalController, AlertController, NavParams, NavController } from '@ionic/angular';
@Component({
  selector: 'app-transfer-input',
  templateUrl: './transfer-input.page.html',
  styleUrls: ['./transfer-input.page.scss'],
})
export class TransferInputPage implements OnInit {
  private type_input: string;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private toastController: ToastController, 
    private modalController: ModalController,
    private alertController: AlertController,
    private navParams: NavParams,
    private navCtrl:NavController
  ) { 
    this.type_input = navParams.get('type_input');
  }

  ngOnInit() {
  }

// * @Function   : close_modal => คำสั่งปิด modal
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
async close_modal(){
  this.modalController.dismiss({
    'dismissed': true
  });
}

}
