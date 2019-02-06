import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { AuthService } from '../auth.service';
import { UserDataService } from '../user-data.service'

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {
  user;

  constructor(
    private authService: AuthService, 
    private userDataService: UserDataService,
    private route: Router) { }

  ngOnInit() {
    this.authService.user.subscribe( (user) => {
      if (user) { 
        this.user = user;

        this.userDataService.userData.subscribe( (data) => {

          if ( data['evening'] && data['morning'] ) {
            this.route.navigate( ['main', this.timeOfDay()] );
          } else { this.route.navigate( ['start'] ); }
          
        });

      } else { this.user = null }
    });

  }

  timeOfDay() {
    if ( (new Date().getHours())  <= 12 ) {
      return 'am';
    } else { return 'pm'; } 
  }

}
