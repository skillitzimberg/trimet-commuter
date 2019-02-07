import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { UserDataService } from '../user-data.service'

@Component({
  selector: 'app-set-stops',
  templateUrl: './set-stops.component.html',
  styleUrls: ['./set-stops.component.css'],
  providers: [ UserDataService ]
})
export class SetStopsComponent implements OnInit {
  constructor( 
    private authService: AuthService, 
    private userDataService: UserDataService
    ) {
   }

   morningId: number;
   eveningId: number;
   user; 

  ngOnInit() {
    this.authService.user.subscribe( (user) => {
      if (user) {
        this.user = user;
        this.userDataService.userData.subscribe( (userData) => {
          this.morningId = userData['morning'];
          this.eveningId = userData['evening'];
        });
      } else { 
        this.morningId = null;
        this.eveningId = null;
      }
    });
  }

  saveMorningStop(stopId) {
    if ( this.user ) { this.userDataService.saveMorningStop(parseInt(stopId)); }
  }

  saveEveningStop(stopId) {
    if ( this.user ) { this.userDataService.saveEveningStop(parseInt(stopId)); }
  }

}
