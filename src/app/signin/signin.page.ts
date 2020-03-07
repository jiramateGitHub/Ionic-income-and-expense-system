import { MPerson } from './../services/m_person/m-person.service';
import { ServicesService } from './../services/services.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  public obj_MPerson: MPerson = {
    per_id : null,
    per_username: null,
    per_password: null,
    per_active: null 
  };
  public username : string;
  public password : string;

  constructor(
    private router:Router,
    private toastController: ToastController,
    private ServicesService : ServicesService,
  ) {
   }

  ngOnInit() {
  }
  

// * @Function   : signin => เข้าสู่ระบบ
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  signin(){
    var check_login = false;
    var count = 0;

    this.obj_MPerson.per_username = this.username
    this.obj_MPerson.per_password = this.password
    this.ServicesService.MPersonService.get_obs_mperson(this.obj_MPerson).subscribe(res => {
      for(var i = 0; i < res.length ; i++){
        if(res[i].per_username == this.username && res[i].per_password == this.password){
          check_login = true;
        }
      }
      if(check_login == true){
        this.ServicesService.SessionService.set_session_username(this.username)
        this.router.navigateByUrl('tabs');
        this.showToast('Sign in successful.');
      }else{
        if(count == 0){
          this.showToast('Username or Password Incorrent.');
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
