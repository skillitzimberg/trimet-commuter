import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  localStorageName: string = "trimetCommuterData";
  private userDataObs: Observable<{}>;
  userData;
  uid: string;

  constructor(private authService: AuthService, private db: AngularFireDatabase) {
    this.init();
   }

   init() {
     this.userData = this.initializeUserData();
     this.userData = this.loadFromLocalStorage(this.userData);
     this.authService.user.subscribe(user => {
       this.uid = user && user.uid;
       if(user) {
         this.userDataObs = this.db.object(this.uid).valueChanges();
         const subscription = this.userDataObs.subscribe((data) => {
           if(data) {
             this.userData = data;
             this.saveToLocalStorage(this.userData);
           } else {
             this.db.object(this.uid).set(this.userData);
           }
           subscription.unsubscribe();
         });
       } else {
         this.userDataObs = new Observable((observer) => {
           observer.next(this.userData);
         });
       }
     })
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
     if (!this.userData.stops.recent) {
       this.userData.stops.recent = [];
     }

     if(this.userData.stops.recent.unshift(stopId) > recentSize) {
       this.userData.stops.recent.length = recentSize;
     }
     this.updateUserData();
   }

   updateUserData() {
     this.saveToLocalStorage(this.userData);
     if(this.uid) {
       this.db.object(this.uid).set(this.userData);
     }
   }
}
