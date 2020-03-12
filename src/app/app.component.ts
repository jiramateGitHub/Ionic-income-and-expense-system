import { ServicesService } from './services/services.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ServicesService:ServicesService,
    private router:Router
  ) {
    this.initializeApp();
    var temp = this.ServicesService.SessionService.get_session_username()
    if(temp == null || temp == "" || temp == undefined){
      this.ServicesService.SessionService.set_session(null,null)
      this.router.navigateByUrl('signin');
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
