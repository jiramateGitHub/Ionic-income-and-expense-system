import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ModalController, AlertController, NavParams, NavController } from '@ionic/angular';
import { ServicesService, MWallet } from './../../services/services.service';

@Component({
  selector: 'app-transfer-input',
  templateUrl: './transfer-input.page.html',
  styleUrls: ['./transfer-input.page.scss'],
})
export class TransferInputPage implements OnInit {
  private type_input: string;
  public wallets: any;
  public balance: number;
  public check_hide_card_his: any;
  public check_hide_card_tran: any;
  public account: string;
  public money: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private modalController: ModalController,
    private alertController: AlertController,
    private navParams: NavParams,
    private navCtrl: NavController,
    private ServicesService: ServicesService,
  ) {
    this.type_input = navParams.get('type_input');
  }

  ngOnInit() {
    this.check_hide_card_his = true
    this.check_hide_card_tran = false
    this.account = ""
    this.money = 0
    console.log(this.account)
    console.log(this.money)

  }

  // * @Function   : close_modal => คำสั่งปิด modal
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-01
  async close_modal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  tranfer_money() {
    this.check_hide_card_his = false
    this.check_hide_card_tran = true
    console.log(this.check_hide_card_his)
    console.log(this.account)
    console.log(this.money)
  }
  history_tran(){
    this.check_hide_card_his = true
    this.check_hide_card_tran = false
  }
  select_wall() {
    this.ServicesService.MWalletService.get_obs_mwallet().subscribe(async res => {
      this.wallets = [];
      res.map((item, index) => {
        this.wallets.push(item)
      })
    })
  }


}
