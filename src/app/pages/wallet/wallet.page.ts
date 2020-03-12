import { ServicesService, MSubCategories } from './../../services/services.service';
import { MWallet } from './../../services/services.service';
import { WalletInputPage } from './../wallet_input/wallet-input.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, NavParams, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  public obj_MWallet : MWallet = {
    username: null,
    wallet_name: null,
    wallet_balance : null,
    wallet_active: null
  }
  public obj_MWallet_List : Observable<MWallet[]>
  public loading: any = 0;
  
  constructor(
    private ToastController:ToastController,
    private router:Router,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private alertController: AlertController,
    private ServicesService:ServicesService
  ) {
    this.get_wallet()
   }

  ngOnInit() {
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
        'type_input': 'insert'
      }
    });
    return await modal.present();
  }

  async get_wallet(){
    this.obj_MWallet_List = this.ServicesService.MWalletService.get_obs_mwallet()
    this.obj_MWallet_List.subscribe(res=>console.log(res))
    
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
    this.ServicesService.MWalletService.delete_transaction(id)
    this.showToast("Delete successful.")
  }
}
