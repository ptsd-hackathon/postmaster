import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPage} from './pages/login/login';
import {FormsModule} from '@angular/forms';

import {Geolocation} from '@ionic-native/geolocation/ngx';

// Apollo
import {GraphQLModule} from './graphql.module';

@NgModule({
    declarations: [AppComponent, LoginPage],
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
