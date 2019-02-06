import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  mode; 
  user;

  timeOfDay: string = 'morning';
  // timeOfDay: string = 'evening';

  trains: Object[] = [{
    id: '1a',
    position: '5%',
    timeAway: '3 mins',
    status: 'Train is on time'
  }, {
    id: '1b',
    position: '25%',
    timeAway: '13 mins',
    status: 'Train is on time'
  }, {
    id: '1c',
    position: '30%',
    timeAway: '23 mins',
    status: 'Train is on time'
  },
  {
    id: '1c',
    position: '99%',
    timeAway: '23 mins',
    status: 'Train is on time'
  },
  {
    id: '1c',
    position: '75%',
    timeAway: '23 mins',
    status: 'Train is on time'
  }

]

  constructor( 
    private route: ActivatedRoute, 
    private location: Location,
    private authService: AuthService) { }

  ngOnInit() { 
    this.route.params.subscribe( (url) => {
      switch ( url['mode'] ) {
        case 'am':
          this.mode = 'am';
          break;
        case 'pm':
          this.mode = 'pm';
          break;
        case 'quick':
          this.mode = 'quick';
          break;
        default:
          this.mode = null;
      } 
    });

    this.authService.user.subscribe((user) => { 
      if (user) { this.user = user }
      else { this.user = null}
    })


  }



  highlightAccordian(train) {
    console.log(train)
  }

  doSomething() {
    console.log('opened!')
  }

}
