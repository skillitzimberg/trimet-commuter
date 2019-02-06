import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  user;
  userData: Observable<{}>;

  constructor(private authService: AuthService, private db: AngularFireDatabase) {
    this.init();
   }

   init() {
     this.authService.user.subscribe((user) => {
       this.user = user;
       if(this.user) {
         this.userData = this.db.object(user.uid).valueChanges();
       } else {
         this.userData = undefined;
       }
     });
   }

   saveMorningStop(stopId) {
     this.updateUserData({ morning: stopId });
   }

   saveEveningStop(stopId) {
     this.updateUserData({ evening: stopId });
   }

   saveQuickStop(stopId) {
     this.updateUserData({ quick: stopId });
     this.saveRecentStop(stopId);
   }

   saveRecentStop(stopId) {
     const recentSize = 5;
     const subscription = this.userData.subscribe((data) => {
       let recentArray = data['recent'] || [];
       recentArray.unshift(stopId);
       if(recentArray.length > recentSize) {
         recentArray.length = recentSize;
       }
       this.updateUserData({ recent: recentArray });
       subscription.unsubscribe();
     });
   }

   updateUserData(stopObject) {
     this.db.object(this.user.uid).update(stopObject);
   }
}
