import { SessionService } from './../services/session/session.service';
import { MPersonService } from './../services/m_person/m-person.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private MPersonService:MPersonService,
    private SessionService:SessionService
  ) { }

  ngOnInit() {
  }

  signin(){
    this.SessionService.username = this.username;
    this.SessionService.password = this.password;
    this.router.navigateByUrl('tabs');

    // let found = false;
    // this.MPersonService.get_signin().subscribe(result => {

    // });
    // for(let data of this.Member){
    //   if(data.username === this.username && data.password === this.password){
    //     this.SessionService.UsPsCode = data.username;
    //     this.SessionService.fname = data.fname;
    //     found = true;
    //     break;
    //   }                   
    // }
    // if(found === false){
    //   alert("Username or Password incorrect");
    // }else{
    //   this.router.navigateByUrl('home');
  }

}
