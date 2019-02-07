import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { trimetApiKey } from './api-keys';

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
       console.log("user", user && user.uid);
       if(this.user) {
         this.userData = this.db.object(user.uid).valueChanges();
       } else {
         this.userData = undefined;
       }
     });
   }

   saveMorningStop(stopId) {
     this.getStopName(stopId).then((stopName) => {
       this.updateUserData({ morning: stopId, morningName: stopName });
     })
   }

   saveEveningStop(stopId) {
     this.getStopName(stopId).then((stopName) => {
       this.updateUserData({ evening: stopId, eveningName: stopName });
     })
   }

   saveQuickStop(stopId) {
     this.getStopName(stopId).then((stopName) => {
       this.updateUserData({ quick: stopId, quickName: stopName });
       this.saveRecentStop([ stopId, stopName ]);
     })

   }

   saveRecentStop(stopIdAndName) {
     const recentSize = 5;
     const subscription = this.userData.subscribe((data) => {
       let recentArray = data['recent'] || [];
       recentArray.unshift(stopIdAndName);
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

   getStopName(stopId) {
     const apiURL = `https://developer.trimet.org/ws/V1/arrivals?appID=${trimetApiKey}&locIDs=${stopId}&minutes=0&json=true`;

     return fetch(apiURL).then((response) => {
       return response.json();
     }).then((responseData) => {
       return (responseData && responseData.resultSet && responseData.resultSet.location && responseData.resultSet.location[0] &&  responseData.resultSet.location[0].desc) || '';
     });
   }
}
