import { ServicesService,MPerson } from './../services/services.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  public obj_MPerson: MPerson = {
    id: null,
    username: null,
    password: null,
  };

  public username : string;
  public password : string;

  constructor(
    private loadingController: LoadingController,
    private router:Router,
    private toastController: ToastController,
    private ServicesService : ServicesService,
  ) {}

  ngOnInit() {
    this.username = "";
    this.password = "";
  }
  
// * @Function   : signin => เข้าสู่ระบบ
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  async signin(){
    //loading present
    var loading;
    var time_loading = 60000;
    this.loadingController.create({
      message: 'Please wait...',
    }).then((overlay) => {
      loading = overlay
      loading.present();
    });
    setTimeout(() => {}, time_loading);

    var check_login = false;
    var count = 0;
    this.obj_MPerson.username = this.username
    this.obj_MPerson.password = this.password
    this.ServicesService.MPersonService.get_obs_mperson(this.obj_MPerson).subscribe(async res => {
      for(var i = 0; i < res.length ; i++){
        if(res[i].username == this.username && res[i].password == this.password){
          check_login = true;
        }
      }
      if(check_login == true){
        this.ServicesService.SessionService.set_session_username(this.username)
        this.ServicesService.SessionService.set_session_wallet(null)
        this.ServicesService.SessionService.login(this.username)
        this.ServicesService.SessionService.isAuthenticated()
        this.showToast('Sign in successful.');
        this.router.navigateByUrl('wallet');
        loading.dismiss();
      }else{
        if(count == 0){
          this.showToast('Username or Password Incorrent.');
          loading.dismiss();
        }
      }
      count++;
    });
  }

// * @Function   : redirect_signup => กลับหน้า sign up
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  redirect_signup(){
    this.router.navigateByUrl('signup');
  }

// * @Function   : redirect_signin => ใช้แสดง Toast
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  showToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }


}
