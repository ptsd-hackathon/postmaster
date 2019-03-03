import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Notification } from 'rxjs';
import { NotificationService } from './device-information/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  // Add the following to your existing ready fuction.

constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, notificationsService: NotificationService) {
  platform.ready().then(() => {
    statusBar.styleDefault();
    splashScreen.hide();
  });
}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
