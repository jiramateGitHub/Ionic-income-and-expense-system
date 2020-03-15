import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ModalController, AlertController, NavParams, NavController } from '@ionic/angular';
import { ServicesService, MWallet, MTransaction} from './../../services/services.service';


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
  public wallet_name: any;
  public select_wallet_name: any;
  public historys: any;
  public now_wallet: any;
 

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
    this.account = ""
    this.money = null
    console.log(this.account)
    console.log(this.money)
    this.history_tran()
    this.select_wallet()
    this.now_wallet = this.ServicesService.SessionService.get_session_wallet()
  }

  ngViewWillEnter(){
    this.now_wallet = this.ServicesService.SessionService.get_session_wallet()
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
    this.money = null                          //reset money when complete tranfer
    this.account = ""                            //reset account when complete tranfer
  }

  history_tran(){
    
    this.check_hide_card_his = true
    this.check_hide_card_tran = false

    this.ServicesService.MTransactionService.get_all_transaction_show().subscribe(async res => {
        this.historys = [];
        this.transection = res
        res.map((item, index) => {
          if(item.categories_type == 3){
            this.historys.push(item)
            }            
        }) 
    })
    console.log(this.historys)
  }

  select_wallet() {
    this.wallets = [];
    this.ServicesService.MWalletService.get_obs_mwallet().subscribe(async res => {      
      res.map((item, index) => {
        this.wallets.push(item)     
      })      
    })  
  }

  async insert_tranfer(){
    this.balance = this.balance - this.money
  
    this.MTransaction.username = this.ServicesService.SessionService.get_session_username();
    this.MTransaction.wallet_name = this.ServicesService.SessionService.get_session_wallet()
    this.MTransaction.transaction_active = "Y"
    this.MTransaction.categories_name = "Transfer_out"
    this.MTransaction.categories_type = 3
    this.MTransaction.sub_categories_name = "Transfer to " + this.select_wallet_name
    this.MTransaction.transaction_amount = this.money
    this.MTransaction.transaction_date = Date()
    this.ServicesService.MTransactionService.insert_transaction(this.MTransaction).then(() => {
      this.showToast('Transfer successful.');
    });

    this.MTransaction.username = this.ServicesService.SessionService.get_session_username();
    this.MTransaction.wallet_name = this.select_wallet_name
    this.MTransaction.transaction_active = "Y"
    this.MTransaction.categories_name = "Transfer_in"
    this.MTransaction.categories_type = 4
    this.MTransaction.sub_categories_name = "Incoming from " + this.ServicesService.SessionService.get_session_wallet()
    this.MTransaction.transaction_amount = this.money
    this.MTransaction.transaction_date = Date()
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

  // set_blance(){
  //   console.log("5656")
  //   this.wallets.map((item,index)=>{
  //     if(item.id==this.wallet_id){
  //       this.balance = item.wallet_balance
  //       this.wallet_name = item.wallet_name
  //     }
  //   })
  // }
  

}
