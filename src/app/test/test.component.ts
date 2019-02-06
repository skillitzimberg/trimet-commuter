import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserDataService } from '../user-data.service';
import { StopService } from '../stop.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [ AuthService, UserDataService, StopService ]
})
export class TestComponent implements OnInit {
  morningId: number;
  eveningId: number;
  quickId: number;
  recentIds: number[];

  constructor( public authService: AuthService, public userDataService: UserDataService, public stopService: StopService ) {
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
            this.recentIds = userData['recent'];
          }
        });
      } else {
        this.morningId = undefined;
        this.eveningId = undefined;
        this.quickId = undefined;
        this.recentIds = undefined;
      }
    });
  }

  ngOnInit() {
  }

  saveMorningStop(stopId) {
    this.userDataService.saveMorningStop(parseInt(stopId));
  }

  saveEveningStop(stopId) {
    this.userDataService.saveEveningStop(parseInt(stopId));
  }

  saveQuickStop(stopId) {
    this.userDataService.saveQuickStop(parseInt(stopId));
  }

  getMorningData() {
    this.stopService.getMorningData();
  }
}
