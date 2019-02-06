import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUiModule } from './material-ui/material-ui.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FirstStartComponent } from './first-start/first-start.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/database'; // can remove?
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth'; // can remove?

import { auth } from 'firebase/app'; // can remove?
import { masterFirebaseConfig } from './api-keys';
import { LoginComponent } from './login/login.component';
import { PancakeMenuComponent } from './pancake-menu/pancake-menu.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RecentSearchComponent } from './recent-search/recent-search.component';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket,
  messagingSenderId: masterFirebaseConfig.messagingSenderId
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FirstStartComponent,
    LoginComponent,
    PancakeMenuComponent,
    SideBarComponent,
    RecentSearchComponent
  ],
  imports: [
    MaterialUiModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
