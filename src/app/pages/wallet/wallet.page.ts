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
  public check_obj_MWallet_List = 0;
  
  constructor(
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


  async modal_update_show(id:string) {
    const modal = await this.modalController.create({
      component: WalletInputPage,
      componentProps: {
        'type_input': 'update',
        'id': id
      }
    });
    return await modal.present();
  }

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
            // this.ServicesService.MSubCategoriesService.delete_sub_categories(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async get_wallet(){
    this.obj_MWallet_List = this.ServicesService.MWalletService.get_obs_mwallet()
    this.obj_MWallet_List.subscribe(res=> this.check_obj_MWallet_List = res.length)
    console.log(this.check_obj_MWallet_List)
  }
}
