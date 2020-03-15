import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ModalController, AlertController, NavParams, NavController } from '@ionic/angular';
import { ServicesService, MWallet, MTransaction } from './../../services/services.service';

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
  public wallet_id: any;
  public wallet_name: any;
  public historys: any;

  private  MTransaction:MTransaction = {
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ToastController: ToastController,
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
    this.money = 0                               //reset money when complete tranfer
    this.account = ""                            //reset account when complete tranfer
  }
  history_tran(){
    
    this.check_hide_card_his = true
    this.check_hide_card_tran = false

    this.ServicesService.MTransactionService.get_all_transaction_show().subscribe(async res => {
        this.historys = [];
        res.map((item, index) => {
          if(item.categories_type == 3){
            this.historys.push(item)
            }            
        }) 
    })
    console.log(this.historys)
  }

  select_wallet() {
    this.ServicesService.MWalletService.get_obs_mwallet().subscribe(async res => {
      this.wallets = [];
      res.map((item, index) => {
        this.wallets.push(item)     
      })      
    })  
    console.log(this.wallets)
    this.set_blance()
  }
  async insert_tranfer(){
    this.balance = this.balance - this.money
  
    this.MTransaction.username = this.ServicesService.SessionService.get_session_username();
    this.MTransaction.wallet_name = this.ServicesService.SessionService.get_session_wallet();
    this.MTransaction.transaction_active = "Y"
    this.MTransaction.categories_name = "Transfer"
    this.MTransaction.categories_type = 3
    this.MTransaction.sub_categories_name = "Transfer to " 
    this.MTransaction.transaction_amount = this.balance
    this.MTransaction.wallet_name = this.wallet_name

    this.ServicesService.MTransactionService.insert_transaction(this.MTransaction).then(() => {
      this.showToast('Transfer successful.');
    });

    this.check_hide_card_his = true
    this.check_hide_card_tran = false
  }

  
  showToast(msg) {
    this.ToastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  set_blance(){
    console.log("5656")
    this.wallets.map((item,index)=>{
      if(item.id==this.wallet_id){
        this.balance = item.wallet_balance
        this.wallet_name = item.wallet_name
      }
    })
  }

}
