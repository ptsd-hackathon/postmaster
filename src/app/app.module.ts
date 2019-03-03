import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {FormsModule} from '@angular/forms';
import {SettingsComponent} from './pages/settings/settings.component';
import {HomeComponent} from './pages/home/home.component';
import {NotificationComponent} from './pages/home/notification/notification.component';
import {Geolocation} from '@ionic-native/geolocation/ngx';

// Apollo
import {GraphQLModule} from './graphql.module';

@NgModule({
    declarations: [AppComponent, LoginComponent, SettingsComponent, HomeComponent, NotificationComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
        FormsModule,
        GraphQLModule,
    ],
    providers: [
        StatusBar,
        Geolocation,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
