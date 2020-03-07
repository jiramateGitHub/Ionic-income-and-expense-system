import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private session_username:string;
  private session_wallet:string;
  constructor() { }

  // * @Function   : set_session => ตั้งค่า username และ wallet ที่เข้าสู่ระบบ
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-07
  set_session(username , wallet){
    this.session_username = username;
    this.session_wallet = wallet;
  }

  // * @Function   : set_session => ตั้งค่า username ที่เข้าสู่ระบบ
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-07
  set_session_username(username){
    this.session_username = username;
  }

  // * @Function   : set_session => ตั้งค่า wallet ที่ใช้
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-07
  set_session_wallet(wallet){
    this.session_wallet = wallet;
  }
}
