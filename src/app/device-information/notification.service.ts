import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( private oneSignal: OneSignal) {
  
      // OneSignal Code start:
      // Enable to debug issues:
      // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };
  
      this.oneSignal.startInit('de69c52c-08b7-4984-8ecf-9f3eec316948', '703322744261');
  
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      
      this.oneSignal.handleNotificationReceived().subscribe(data => {
       // do something when notification is received
       alert(data.payload.title);
      });
      
      this.oneSignal.handleNotificationOpened().subscribe(data => {
        // do something when a notification is opened
        alert(data.notification.payload.body);
      });
      
      this.oneSignal.endInit();
  
      // window["plugins"].OneSignal
      //   .startInit("de69c52c-08b7-4984-8ecf-9f3eec316948", "YOUR_GOOGLE_PROJECT_NUMBER_IF_ANDROID")
      //   .handleNotificationOpened(notificationOpenedCallback)
      //   .endInit();
    };
  }  
