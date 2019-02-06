import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { UserDataService } from '../user-data.service'
import { StopService } from '../stop.service';

@Component({
  selector: 'app-first-start',
  templateUrl: './first-start.component.html',
  styleUrls: ['./first-start.component.css'],
  providers: [ UserDataService ]
})
export class FirstStartComponent implements OnInit {
  constructor( 
    public authService: AuthService, 
    public userDataService: UserDataService, 
    public stopService: StopService ) {
   }

   morningId: number;
   eveningId: number;

  ngOnInit() {
    this.authService.user.subscribe( (user) => {
      if (user) {
        this.userDataService.userData.subscribe( (userData) => {
          if (userData) {
            this.morningId = userData['morning'];
            this.eveningId = userData['evening'];
          } 
        });
      } else { 
        this.morningId = null;
        this.eveningId = null;
      }
    });
  }

  saveMorningStop(stopId) {
    this.userDataService.saveMorningStop(parseInt(stopId));
  }

  saveEveningStop(stopId) {
    this.userDataService.saveEveningStop(parseInt(stopId));
  }

}
