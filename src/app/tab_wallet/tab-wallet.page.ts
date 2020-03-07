import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab-wallet',
  templateUrl: 'tab-wallet.page.html',
  styleUrls: ['tab-wallet.page.scss']
})
export class TabWalletPage {

  constructor(
    private router: Router,
    ) {
   
  }
  
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
