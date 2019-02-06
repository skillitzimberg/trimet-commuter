import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
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
    position: '50%',
    timeAway: '23 mins',
    status: 'Train is on time'
  }

]

  constructor() { }

  ngOnInit() {
  }

  highlightAccordian(train) {
    console.log(train)
  }

  doSomething() {
    console.log('opened!')
  }

}
