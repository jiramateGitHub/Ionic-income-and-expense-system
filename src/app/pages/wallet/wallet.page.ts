import { ServicesService, MSubCategories } from './../../services/services.service';
import { MWallet } from './../../services/services.service';
import { WalletInputPage } from './../wallet_input/wallet-input.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, NavParams, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  private  edit_MWallet:MWallet = {
    username: null,
    wallet_name: null,
    wallet_balance : null,
    wallet_active: null
  }

  private obj_MWallet_List : Observable<MWallet[]>
  private loading: any = 0;
  private check_obj_MWallet_List = 0;
  private check_delete = false;
  private type_input : string
  
  constructor(
    private ToastController:ToastController,
    private router:Router,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private alertController: AlertController,
    private ServicesService:ServicesService
  ) {
   }

  ngOnInit() {
    this.get_wallet()
    if(this.ServicesService.SessionService.get_session_wallet() == null){
      this.type_input = "select_wallet"
    }
  }

  ionViewWillEnter(){
    this.get_wallet()
  }

  ionViewDidEnter(){
    this.loading = true;
  }

  // * @Function   : modal_insert_show => แสดง modal TransactionInputPage
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-01
  async modal_insert_show() {
    const modal = await this.modalController.create({
      component: WalletInputPage,
      componentProps: {
        'type_input': 'insert',
      }
    });
    return await modal.present();
  }

  // * @Function   : get_wallet => แสดงรายการ wallet
  // * @Author     : Wipawee
  // * @Create Date: 2563-03-12
  async get_wallet(){
    this.obj_MWallet_List = await this.ServicesService.MWalletService.get_obs_mwallet()
    await this.obj_MWallet_List.subscribe(res=> this.check_obj_MWallet_List = res.length)
  }

  // * @Function   : wallet_active_update_AlertConfirm => แสดง modal delete confirm 
  // * @Author     : Netchanok Thaintin
  // * @Create Date: 2563-03-12
  async wallet_active_update_AlertConfirm(id:string) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.check_delete = true;
            this.delete_wallet(id)
          }
        }
      ]
    });

    await alert.present();
  }

  // * @Function   : showToast => แสดง Toast แจ้งเตือน
  // * @Author     : Netchanok Thaintin
  // * @Create Date: 2563-03-12
  showToast(msg) {
    this.ToastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  // * @Function   : delete_wallet => ลบ wallet
  // * @Author     : Netchanok Thaintin
  // * @Create Date: 2563-03-12
  delete_wallet(id:string){
    if(id != null || id != undefined || id != ''){
      this.obj_MWallet_List.subscribe(res=>{
        if(res.length > 1){
          if(this.check_delete == true){
            this.ServicesService.MWalletService.delete_wallet(id)
            this.showToast("Delete successful.")
          }
          this.check_delete = false;
        }else{
          if(this.check_delete == true){
            this.showToast("Can't delete wallet.")
          }
          this.check_delete = false;
        }
      })
    }
  }

  // * @Function   :  modal_edit_show => modal แก้ไข wallet
  // * @Author     : Netchanok Thaintin
  // * @Create Date: 2563-03-13
  async modal_edit_show(id:string) {
    await this.ServicesService.MWalletService.get_edit_wallet(id).subscribe( async res => {
      this.edit_MWallet = res;
      console.log(this.edit_MWallet);
      const modal = await this.modalController.create({
        component: WalletInputPage,
        componentProps: {
          'type_input': 'update', 
          'id':id,
          'username':this.edit_MWallet.username,
          'wallet_name':this.edit_MWallet.wallet_name,
          'wallet_balance':this.edit_MWallet.wallet_balance,
          'wallet_active':this.edit_MWallet.wallet_active
        }
      });
      return await modal.present();
    })
  }

  // * @Function   :  set_session_wallet => ตั้งค่ากระเป๋าเงิน
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-15
  set_session_wallet(wallet_name : string){
    this.ServicesService.SessionService.set_session_wallet(wallet_name)
    this.router.navigateByUrl('tabs');
  }

}
