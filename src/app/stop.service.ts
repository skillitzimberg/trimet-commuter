import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserDataService } from './user-data.service';
import { trimetApiKey } from './api-keys';
import { Arrival } from './models/arrival.model';
import { Stop } from './models/stop.model';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StopService {
  morningId: number;
  eveningId: number;
  quickId: number;


  constructor(public authService: AuthService, public userDataService: UserDataService) {
    this.init();
  }

  init() {
    this.authService.user.subscribe((user) => {
      if(user) {
        this.userDataService.userData.subscribe((userData) => {
          if(userData) {
            this.morningId = userData['morning'];
            this.eveningId = userData['evening'];
            this.quickId = userData['quick'];
          }
        });
      } else {
        this.morningId = undefined;
        this.eveningId = undefined;
        this.quickId = undefined;
      }
    });
  }

  getMorningData() {
    return this.getStopData(this.morningId);
  }

  getEveningData() {
    return this.getStopData(this.eveningId);
  }

  getQuickData() {
    return this.getStopData(this.quickId);
  }

  getStopData(stopId) {
    const apiURL = `https://developer.trimet.org/ws/V1/arrivals?appID=${trimetApiKey}&locIDs=${stopId}&minutes=30&json=true`;

    const updateInterval = 1000;
    const trimetInterval = 60000;
    let trimetLastTime = 0;
    let trimetResponse = {};

    const counter = interval(updateInterval);
    const createStop = map((count) => {
      const now = (new Date()).getTime();
      return new Stop([], { locid: count});
    });

    return createStop(counter);

    // return fetch(apiURL).then((response) => {
    //   return response.json();
    // }).then((responseData) => {
    //   console.log('resp', responseData);
    //   const arrivals: Arrival[] = [];
    //   let currentStop: Stop;
    //   if (responseData && responseData.resultSet) {
    //     if (responseData.resultSet.arrival) {
    //       const queryTime = (new Date(responseData.resultSet.queryTime)).getTime();
    //       responseData.resultSet.arrival.forEach((arrivalData) => {
    //         arrivals.push(new Arrival(queryTime, arrivalData));
    //       });
    //     }
    //
    //     let stopData = responseData.resultSet.location[0] || {};
    //     console.log("stopData", stopData);
    //     currentStop = new Stop(arrivals, stopData);
    //
    //   }
    //   return currentStop;
    // });
  }
}
