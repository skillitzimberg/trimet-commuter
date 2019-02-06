import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserDataService } from './user-data.service';
import { trimetApiKey } from './api-keys';
import { Arrival } from './models/arrival.model';
import { Stop } from './models/stop.model';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs';
import { from } from 'rxjs';
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
    const trimetInterval = 5000;
    let trimetLastTime = 0;
    let trimetResponse = {};

    const counter = interval(updateInterval);
    const updateStop = map((count) => {
      const now = (new Date()).getTime();
      const interval = now - trimetLastTime;
      if(interval >= trimetInterval) {
        trimetLastTime = now;
        return fetch(apiURL).then((response) => {
          return response.json();
        }).then((responseData) => {
          console.log("trimet", responseData);
          trimetResponse = responseData;
          return this.createStop(now, responseData);
        });
      } else {
        // update with latest time
        return new Stop([], { locid: count});
      }
    });

    return updateStop(counter);
  }

  createStop(currentTime, data) {
    const arrivals: Arrival[] = [];
    let stop: Stop;

    if (data && data.resultSet) {
      if (data.resultSet.arrival) {
        data.resultSet.arrival.forEach((arrivalData) => {
          arrivals.push(new Arrival(currentTime, arrivalData));
        });
      }
    }

    let stopData = data.resultSet.location[0] || {};
    return new Stop(arrivals, stopData);
  }
}
