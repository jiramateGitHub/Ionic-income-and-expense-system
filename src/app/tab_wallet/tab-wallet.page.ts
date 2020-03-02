import { SessionService } from '../services/session/session.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab-wallet',
  templateUrl: 'tab-wallet.page.html',
  styleUrls: ['tab-wallet.page.scss']
})
export class TabWalletPage {

  constructor(private SessionService:SessionService, private router:Router) {
   
  }

}
