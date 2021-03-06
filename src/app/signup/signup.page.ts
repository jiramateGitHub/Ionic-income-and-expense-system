import { ServicesService, MPerson, MWallet} from './../services/services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public obj_MPerson: MPerson = {
    username: null,
    password: null,
  };

  public obj_MWallet: MWallet = {
    username: null,
    wallet_name: null,
    wallet_balance: null,
    wallet_active: null
  };

  public username : string;
  public password : string;
  public validate_password : string;

  constructor(
    private loadingController: LoadingController,
    private router:Router,
    private toastController: ToastController,
    private ServicesService:ServicesService
  ) {}

// * @Function   : ngOnInit => ทำหน้าที่ในการ initial ค่าข้อมูลของ component
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  ngOnInit() {
    this.username = "";
    this.password = "";
  }

// * @Function   : signup => สมัครสมาชิก
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  async signup(){
    //loading present
    var loading;
    var time_loading = 60000;
    await this.loadingController.create({
      message: 'Please wait...',
    }).then((overlay) => {
      loading = overlay
      loading.present();
    });
    setTimeout(() => {}, time_loading);
    
    if(this.password == this.validate_password){
      this.obj_MPerson.username = this.username;
      this.obj_MPerson.password = this.password;
      var check_username_duplicate = false;
      var count = 0;
      this.ServicesService.MPersonService.get_obs_mperson(this.obj_MPerson).subscribe(async res => {
        for(var i = 0; i < res.length ; i++){
          if(res[i].username == this.username){
            check_username_duplicate = true;
            break;
          }
        }
        if(check_username_duplicate == false){
          this.ServicesService.MPersonService.insert_person(this.obj_MPerson).then(() => {
            
            this.obj_MWallet.username = this.username
            this.obj_MWallet.wallet_active = "Y"
            this.obj_MWallet.wallet_balance = 0
            this.obj_MWallet.wallet_name = "Wallet first"
            this.ServicesService.MWalletService.insert_wallet(this.obj_MWallet)

            this.ServicesService.SessionService.set_session_username(this.username)
            this.router.navigateByUrl('signin');
            this.showToast('Sign up successful.');
            loading.dismiss();
          }, err => {
            this.showToast('There was a problem sign up your account :(');
            loading.dismiss();
          });
        }else{
          if(count == 0){
            this.showToast('Your username duplicate.');
            loading.dismiss();
          }
        }
        count++;
      });
    }else{
      this.showToast('Passwords do not match.');
      loading.dismiss();
    }
  }

// * @Function   : redirect_signin => กลับหน้า sign in
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  redirect_signin(){
    this.router.navigateByUrl('signin');
  }
  
// * @Function   : showToast => ใช้แสดง Toast
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  showToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }


}
