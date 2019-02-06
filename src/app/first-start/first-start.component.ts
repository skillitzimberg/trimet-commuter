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
  //  quickId: number;
  //  recentIds: number[];


  ngOnInit() {

    this.authService.user.subscribe( (user) => {
      console.log(user)
      if(user) {
        this.userDataService.userData.subscribe((userData) => {
          if(userData) {
            this.morningId = userData['morning'];
            this.eveningId = userData['evening'];
            // this.quickId = userData['quick'];
            // this.recentIds = userData['recent'];
          }

          console.log(this.morningId);
          console.log(this.eveningId);

        });
      } 
      
      // else {
      //   this.morningId = undefined;
      //   this.eveningId = undefined;
      //   this.quickId = undefined;
      //   this.recentIds = undefined;
      // }
    });



  }
  

  saveMorningStop(stopId) {
    console.log(stopId)
    this.userDataService.saveMorningStop(parseInt(stopId));
    console.log(`morning set: ${this.morningId}`)
  }

  saveEveningStop(stopId) {
    console.log(stopId)

    this.userDataService.saveEveningStop(parseInt(stopId));
    console.log(`evening set: ${this.eveningId}`)

  }
}
