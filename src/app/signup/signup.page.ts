import { SessionService } from './../services/session/session.service';
import { MPersonService } from './../services/m_person/m-person.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  data: Person = {
    per_username: '',
    per_password: ''
  };

  public username:string;
  public password:string;
  public validate_password:string;

  constructor(
    private router:Router,
    private toastController: ToastController,
    private MPersonService:MPersonService,
    private SessionService:SessionService
  ) { }

  ngOnInit() {
    this.username = "";
    this.password = "";
  }

  signup(){
    if(this.password == this.validate_password){
      this.data.per_username = this.username;
      this.data.per_password = this.password;
      var temp = this.MPersonService.getIdeas(); 

      this.MPersonService.addIdea(this.data).then(() => {
        this.router.navigateByUrl('signin');
        this.showToast('Sign up successful.');
      }, err => {
        this.showToast('There was a problem sign up your account :(');
      });
    }else{
      this.showToast('Passwords do not match.');
    }
    
  }

  redirect_signin(){
    this.router.navigateByUrl('signin');
  }

  showToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }


}
