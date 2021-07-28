import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireRemoteConfigModule } from '@angular/fire/remote-config';
import { environment } from 'src/environments/environment';
import { DataService } from './services/data.service';
import { UserResolverService } from './resolvers/user-resolver.service';
import { DatePopoverComponent } from './components/date-popover/date-popover.component';

@NgModule({
  declarations: [AppComponent, DatePopoverComponent],
  entryComponents: [
    DatePopoverComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AngularFireRemoteConfigModule
   ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DataService,
    UserResolverService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
