import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service'

@Component({
  selector: 'app-first-start',
  templateUrl: './first-start.component.html',
  styleUrls: ['./first-start.component.css'],
  providers: [ UserDataService ]
})
export class FirstStartComponent implements OnInit {

  constructor( public userDataService: UserDataService ) {
   }

  ngOnInit() {
  }

  saveMorningStop(stopId) {
    this.userDataService.saveMorningStop(parseInt(stopId));
  }

  saveEveningStop(stopId) {
    this.userDataService.saveEveningStop(parseInt(stopId));
  }
}
