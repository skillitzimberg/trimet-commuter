import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserDataService } from './user-data.service';
import { trimetApiKey } from './api-keys';

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
    const apiURL: string = `https://developer.trimet.org/ws/V1/arrivals?appID=${trimetApiKey}&locIDs=${stopId}&json=true`;

    fetch(apiURL).then((response) => {
      return response.json();
    }).then((responseData) => {
      console.log(responseData);
    });
  }
}
