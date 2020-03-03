import { SessionService } from './../services/session/session.service';
import { MPersonService } from './../services/m_person/m-person.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  public username:string;
  public password:string;

  constructor(
    private router:Router,
    private toastController: ToastController,
    private MPersonService:MPersonService,
    private SessionService:SessionService
  ) { }

  ngOnInit() {
  }

// * @Function   : signin => เข้าสู่ระบบ
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  signin(){
    var check_login = false;
    var count = 0;
    this.MPersonService.get_obs_mperson().subscribe(res => {
      for(var i = 0; i < res.length ; i++){
        if(res[i].per_username == this.username && res[i].per_password == this.password){
          check_login = true;
        }
      }
      if(check_login == true){
        this.SessionService.username = this.username;
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
