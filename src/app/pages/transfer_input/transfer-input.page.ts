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
  public wallets: any;                       //เก็บกระเป๋าเงิน
  public balance: number;                    //เก็บยอดเงินคงเหลือที่จะแสดงหน้า view
  public check_hide_card_his: any;           //ใช้สำหรับเปิด - ปิด card ประวัติการโอน          
  public check_hide_card_tran: any;          //ใช้สำหรับเปิด - ปิด card การโอน      
  public money: number;                      //ใช้เก็บจำนวนเงินที่จะโอน
  //public wallet_name: any;
  public select_wallet_id: any;              //เก็บ id ของ wallet ที่เลือกที่จะทำการโอน 
  public select_wallet_name: any;            //เก็บ ชื่อ ของ wallet ที่เลือกที่จะทำการโอน
  public historys: any;                      //เก็บข้อมูลของ transaction
  public now_wallet: any;                    //เก็บชื่อกระเป๋าที่เรากำลังใช้
 

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

  private  edit_MWallet:MWallet = {
    username: null,
    wallet_name: null,
    wallet_balance : null,
    wallet_active: null
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
    this.money = null
    this.history_transfer()
    this.select_wallet()
    this.now_wallet = this.ServicesService.SessionService.get_session_wallet()
    this.ServicesService.MWalletService.get_edit_wallet(this.ServicesService.SessionService.get_session_wallet_id()).subscribe( res => {
      this.balance = res.wallet_balance;
    })
  }

  ngViewWillEnter(){
    this.now_wallet = this.ServicesService.SessionService.get_session_wallet()       //กำหนดกระเป๋าที่ใช้อยู่
  }

  // * @Function   : close_modal => คำสั่งปิด modal
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-01
  async close_modal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  // * @Function   : tranfer_money => สลับ card เป็นส่วนของการโอน
  // * @Author     : Nuttorn Porkpibul
  // * @Create Date: 2563-03-06
  tranfer_money() {
    this.check_hide_card_his = false           //ทำการปิด card ของประวัติการโอน
    this.check_hide_card_tran = true           //ทำการเปิด card ของการโอน
    this.money = null                          //reset ค่าเงินที่จะโอน
  }


  // * @Function   : history_transfer => สลับ card เป็นส่วนของประวัติการโอน
  // * @Author     : Nuttorn Porkpibul
  // * @Create Date: 2563-03-06
  history_transfer(){
    this.check_hide_card_his = true             //ทำการเปิด card ของประวัติการโอน
    this.check_hide_card_tran = false           //ทำการปิด card ของการโอน

    this.ServicesService.MTransactionService.get_all_transaction_show().subscribe(async res => {
        this.historys = [];                                                                                 //กำหนดให้ historys เป็น array
        res.map((item, index) => {
          if(item.categories_type == 3 && item.wallet_name == this.now_wallet){                             //เช็คว่าจะเก็บค่า historys เฉพาะประเภทการโอนที่กระเป๋าปัจจุบัน 
            this.historys.push(item)                                                                        //เก็บค่า historys
            }            
        }) 
    })
  }


  // * @Function   : select_wallet => เก็บค่า wallet ที่ยังใช้งานไว้ใน wallets เพื่อนำไปแสดงในส่วนข้อง select box หน้า html
  // * @Author     : Nuttorn Porkpibul
  // * @Create Date: 2563-03-06
  select_wallet() {
    this.wallets = [];                                                                    //กำหนด wallets เป็น array
    this.ServicesService.MWalletService.get_obs_mwallet().subscribe(async res => {      
      res.map((item, index) => {
        if(item.wallet_name != this.now_wallet){                                          //จะเก็บ wallets ทุกตัวที่ไม่ใช่ wallets ที่เลือกทั้งเเต่เเรก
          this.wallets.push(item)                                                         //นำค่าเข้า wallets
        }
      })      
    })  
    
  }


  // * @Function   : insert_tranfer => เพิ่มค่าเเละแก้ไขในส่วนของการโอนลง database transaction 
  // * @Author     : Nuttorn Porkpibul
  // * @Create Date: 2563-03-06
  async insert_tranfer(){
    await this.ServicesService.MWalletService.get_edit_wallet(this.select_wallet_id).subscribe( res => {     
      this.select_wallet_name = res.wallet_name;

      var date = Date()
      var month = date.substr(4,3)
      var day = date.substr(8,2)
      var year = date.substr(11,4)
      var month_num;
    
      if(month == "Jan"){
        month_num = "01" ; 
      }else if(month == "Feb"){
        month_num = "02" ;
      }else if(month == "Mar"){
        month_num = "03" ;
      }else if(month == "Apr"){
        month_num = "04" ;
      }else if(month == "May"){
        month_num = "05" ;
      }else if(month == "Jun"){
        month_num = "06" 
      }else if(month == "Jul"){
        month_num = "07" 
      }else if(month == "Aug"){
        month_num = "08" 
      }else if(month == "Sep"){
        month_num = "09" 
      }else if(month == "Oct"){
        month_num = "10" 
      }else if(month == "Nov"){
        month_num = "11" 
      }else if(month == "Dec"){
        month_num = "12" 
      }
      
      this.MTransaction.username = this.ServicesService.SessionService.get_session_username();
      this.MTransaction.wallet_name = this.ServicesService.SessionService.get_session_wallet()
      this.MTransaction.transaction_active = "Y"
      this.MTransaction.categories_name = "Transfer_out"
      this.MTransaction.categories_type = 3
      this.MTransaction.sub_categories_name = "Transfer to " + this.select_wallet_name
      this.MTransaction.transaction_amount = this.money
      this.MTransaction.transaction_date = year + "-" + month_num + "-" + day;
      this.ServicesService.MTransactionService.insert_transaction(this.MTransaction).then(() => {
        this.showToast('Transfer successful.');
        this.ServicesService.MWalletService.get_edit_wallet(this.ServicesService.SessionService.get_session_wallet_id()).subscribe( res => {    //ดึงข้อมูล wallet ปัจจุบันมาแก้ไข
          this.edit_MWallet = res;
          this.edit_MWallet.wallet_balance -= this.money
          this.ServicesService.MWalletService.update_wallet_name(this.ServicesService.SessionService.get_session_wallet_id(),this.edit_MWallet)  //อัปเดทกระเป๋าโดยส่งค่าที่ทำกสรแก้ไขเเล้วเข้าไป
        })
      });

      this.MTransaction.username = this.ServicesService.SessionService.get_session_username();
      this.MTransaction.wallet_name = this.select_wallet_name
      this.MTransaction.transaction_active = "Y"
      this.MTransaction.categories_name = "Transfer_in"
      this.MTransaction.categories_type = 4
      this.MTransaction.sub_categories_name = "Incoming from " + this.ServicesService.SessionService.get_session_wallet()
      this.MTransaction.transaction_amount = this.money
      this.MTransaction.transaction_date = year + "-" + month_num + "-" + day;
      this.ServicesService.MTransactionService.insert_transaction(this.MTransaction).then(() => {
        this.showToast('Transfer successful.');
        this.ServicesService.MWalletService.get_edit_wallet(this.select_wallet_id).subscribe( res => {
          this.edit_MWallet = res;
          this.edit_MWallet.wallet_balance += this.money
          this.ServicesService.MWalletService.update_wallet_name(this.select_wallet_id,this.edit_MWallet)
        })
      });
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
    })

    this.balance -= this.money;                                 //เมื่อโอนเงินเเล้วให้ลบเงินก่อนนำไปแสดง

    this.check_hide_card_his = true                             //เปิด card ส่วนของประวัติการโฮน
    this.check_hide_card_tran = false                           //ปิด card ส่วนของการโฮน
  }

  
  showToast(msg) {
    this.ToastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
