import { SessionService } from './../services/session/session.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  
  constructor(private SessionService:SessionService, private router:Router) {
    console.log(this.SessionService.password );
    if(this.SessionService.password == undefined){
      this.router.navigateByUrl('signin');
    }
  }
}
