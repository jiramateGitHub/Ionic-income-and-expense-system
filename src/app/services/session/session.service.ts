import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private session_username:string;
  private session_wallet:string;
  isLoggedIn: Boolean;
  user: any;
  constructor(public storage: Storage) {

    this.storage.get('user').then((user) => {

        this.user = user;
        this.isLoggedIn = true;
    });

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


  login(user) {
      this.storage.set('user', user).then(() => {
          this.isLoggedIn = true;
          this.user = user;
      });
  }

  logout() {
      this.storage.remove('user').then(() => {
          this.isLoggedIn = false;
          this.user = null;
      });
  }

  isAuthenticated() {
  return this.isLoggedIn
  }

  getUser() {
    return this.storage.get('user').then((val) => {
      console.log('Your user is', val);
    });
  }

}
