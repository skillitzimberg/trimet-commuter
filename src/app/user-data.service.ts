import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  localStorageName: string = "trimetCommuterData";
  userData: Object;

  constructor() {
    this.init();
   }

   init() {
     this.initializeUserData();
     this.userData = this.loadFromLocalStorage(this.userData);
   }

   initializeUserData() {
     return {
       stops: {
         morning: [],
         evening: [],
         quick: [],
         recent: []
       }
     };
   }

   loadFromLocalStorage(userData) {
     if(window.localStorage) {
       const data = window.localStorage.getItem(this.localStorageName);
       if(data) {
         return data;
       }
       return userData;
     }
   }

   saveToLocalStorage(userData) {
     if(window.localStorage) {
       window.localStorage.setItem(this.localStorageName, userData);
     }
   }
}
