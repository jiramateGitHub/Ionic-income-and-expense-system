import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private session_username:any;
  private session_wallet:any;
  private session_wallet_id:any;
  isLoggedIn: Boolean;

  constructor(public storage: Storage, private router:Router) {
        this.session_username = null;
        this.isLoggedIn = false;
  }

  // * @Function   : set_session => ตั้งค่า session_username และ session_wallet ที่เข้าสู่ระบบ
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-07
  set_session(username , wallet){
    this.session_username = username;
    this.session_wallet = wallet;
  }

  // * @Function   : set_session => ตั้งค่า session_username ที่เข้าสู่ระบบ
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-07
  set_session_username(username){
    this.session_username = username;
  }

  // * @Function   : set_session => ตั้งค่า session_wallet ที่ใช้
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-07
  set_session_wallet(wallet){
    this.session_wallet = wallet;
  }

  // * @Function   : set_session => ตั้งค่า session_wallet_id ที่ใช้
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-07
  set_session_wallet_id(wallet_id){
    this.session_wallet_id = wallet_id;
  }

  // * @Function   : get_session_username => คืนค่า session_username ที่เข้าสู่ระบบ
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-08
  get_session_username(){
    return this.session_username;
  }

  // * @Function   : get_session_wallet => คืนค่า session_wallet ที่ใช้งานอยู่
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-08
  get_session_wallet(){
    return this.session_wallet;
  }

  // * @Function   : get_session_wallet_id => คืนค่า session_wallet_id ที่ใช้งานอยู่
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-08
  get_session_wallet_id(){
    return this.session_wallet_id;
  }

  // * @Function   : login => เมื่อ login จะบันทึกค่าลง Local Storage
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-13
  login(user) {
    this.storage.set('session_username', user).then(() => {
        this.isLoggedIn = true;
        this.session_username = user;
    });
  }
  
  // * @Function   : logout => เมื่อ logout จะลบค่าจาก Local Storage
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-13
  logout() {
    this.storage.remove('session_username').then(() => {
        this.isLoggedIn = false;
        this.session_username = null;
    });
  }

  // * @Function   : isAuthenticated => ตรวจสอบการ Login ว่ามีบันทึกใใน Local Storage หรือไม่
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-13
  async isAuthenticated() {
    await this.storage.get('session_username').then((user) => {
      this.session_username = user;
      if(user == null){
        this.isLoggedIn = false;
      }else{
        this.isLoggedIn = true;
      }
      // console.log("isAuthenticated : ", user , " : " , this.isLoggedIn)
      // console.log("Wallet : ", this.session_wallet)
    });
    if(this.isLoggedIn == false){
      this.router.navigateByUrl('signin');
    }else{
      this.set_session_username(this.session_username)
      if(this.session_wallet == null){
        this.router.navigateByUrl('wallet');
      }else{
        this.router.navigateByUrl('tabs');
      }
    }
  }

}
