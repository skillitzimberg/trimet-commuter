import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  localStorageName: string = "trimetCommuterData";
  userData;

  constructor() {
    this.init();
   }

   init() {
     this.userData = this.initializeUserData();
     this.userData = this.loadFromLocalStorage(this.userData);
     //??? subscribe to observable for changes to database
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
       const data = JSON.parse(window.localStorage.getItem(this.localStorageName));
       if(data) {
         return data;
       }
       return userData;
     }
   }

   saveToLocalStorage(userData) {
     if(window.localStorage) {
       window.localStorage.setItem(this.localStorageName, JSON.stringify(userData));
     }
   }

   saveMorningStop(stopId) {
     this.userData.stops.morning = [stopId];
     this.updateUserData();
   }

   saveEveningStop(stopId) {
     this.userData.stops.evening = [stopId];
     this.updateUserData();
   }

   saveQuickStop(stopId) {
     this.userData.stops.quick = [stopId];
     this.updateUserData();
   }

   saveRecentStop(stopId) {
     const recentSize = 5;
     if(this.userData.stops.recent.unshift(stopId) > recentSize) {
       this.userData.stops.recent = recentSize;
     }
     this.updateUserData();
   }

   updateUserData() {
     this.saveToLocalStorage(this.userData);
     console.log("update", this.userData);
     //??? update observable to go into database
   }
}
