import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './../services/session/session.service';
@Component({
  selector: 'app-tab-account',
  templateUrl: 'tab-account.page.html',
  styleUrls: ['tab-account.page.scss']
})
export class TabAccountPage {

  constructor(
    private SessionService:SessionService,
    private router:Router) {
      
    }

  // * @Function   : redirect_signin => ไปหน้า wallet
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-02
  redirect_wallet(){
    this.router.navigateByUrl('wallet');
  }

  // * @Function   : redirect_category => ไปหน้า category
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-02
  redirect_category(){
    this.router.navigateByUrl('category');
  }

// * @Function   : logout => ออกจากระบบ
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-02
  logout(){
    this.SessionService.username = ""
    this.router.navigateByUrl('signin');
  }
}
