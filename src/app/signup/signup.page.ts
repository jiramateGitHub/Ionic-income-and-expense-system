import { SessionService } from './../services/session/session.service';
import { MPersonService, MPerson } from './../services/m_person/m-person.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public data: MPerson = {
    per_username: '',
    per_password: '',
    per_active:'Y'
  };

  public username : string;
  public password : string;
  public validate_password : string;

  constructor(
    private router:Router,
    private toastController: ToastController,
    private MPersonService:MPersonService,
    private SessionService:SessionService
  ) {
    this.username = "";
    this.password = "";
   }

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
  signup(){
    if(this.password == this.validate_password){
      this.data.per_username = this.username;
      this.data.per_password = this.password;
      var check_username_duplicate = false;
      var count = 0;
      this.MPersonService.get_obs_mperson().subscribe(res => {
        for(var i = 0; i < res.length ; i++){
          if(res[i].per_username == this.username){
            check_username_duplicate = true;
            break;
          }
        }
        if(check_username_duplicate == false){
          this.MPersonService.insert_person(this.data).then(() => {
            this.router.navigateByUrl('signin');
            this.showToast('Sign up successful.');
          }, err => {
            this.showToast('There was a problem sign up your account :(');
          });
        }else{
          if(count == 0){
            this.showToast('Your username duplicate.');
          }
        }
        count++;
      });
    }else{
      this.showToast('Passwords do not match.');
    }
  }

// * @Function   : redirect_signin => กลับหน้า sign in
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
  redirect_signin(){
    this.router.navigateByUrl('signin');
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
