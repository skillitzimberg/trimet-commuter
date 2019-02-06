import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule, MatExpansionModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/database'; // can remove???
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth'; // can remove???

// import { MaterialUiModule } from './material-ui/material-ui.module' DEPRECATED
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FirstStartComponent } from './first-start/first-start.component';

import { auth } from 'firebase/app'; // can remove???
import { masterFirebaseConfig } from './api-keys';
import { LoginComponent } from './login/login.component';
import { PancakeMenuComponent } from './pancake-menu/pancake-menu.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RecentSearchComponent } from './recent-search/recent-search.component';
import { TestComponent } from './test/test.component';

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
    RecentSearchComponent,
    TestComponent
  ],
  imports: [
    // MaterialUiModule, // DEPRICATED: remove ALL contents from: ./material-ui/

    // MatIconModule, //maybe??
    MatExpansionModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
