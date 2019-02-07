import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../auth.service';
import { UserDataService } from '../user-data.service';
import { StopService } from '../stop.service';
import { Stop } from '../models/stop.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ AuthService, UserDataService, StopService ]
})
export class MainComponent implements OnInit {
  mode;
  user;
  subscription;
  stop: Stop;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    public userDataService: UserDataService,
    public stopService: StopService
  ) { }

  // timeOfDay: string = 'morning';
  // timeOfDay: string = 'evening';

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.userDataService.userData.subscribe((userData) => {
          this.route.params.subscribe( (url) => {
            const urlTime = url['mode'];
            this.mode = urlTime;
            if (this.mode === 'am') {
              this.getMorningData();
            } else if (this.mode === 'pm') {
              this.getEveningData();
            } else if (this.mode === 'quick') {
              this.getQuickData();
            }
          });
        });
      }
    });
  }

  clearSubscription() {
    if(this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  subscribeToStop(observer) {
    this.subscription = observer.subscribe((promise) => {
      promise.then((stop) => {
        this.stop = stop;
      })
    });
  }

  getMorningData() {
    this.clearSubscription();
    this.subscribeToStop(this.stopService.getMorningData());
  }

  getEveningData() {
    this.clearSubscription();
    this.subscribeToStop(this.stopService.getEveningData());
  }

  getQuickData() {
    this.clearSubscription();
    this.subscribeToStop(this.stopService.getQuickData());
  }

  getAccordianPercentage(min, sec) {
    const total = 30;
    const time = min + (sec / 60);
    return `${Math.round(100 * (time / total))}%`
  }

  highlightAccordian(arrival) {
    console.log("mouse over", arrival);
  }

  getIconClass(type, line) {
    let value = 'icon';
    value += ' ' + type;
    if(type === 'max') {
      value += ' ' + line.toLowerCase();
    }
    console.log("value", value);
    return value;
  }

  getIconText(type, line) {
    if(type === 'max') {
      return 'M';
    } else if(type === 'bus') {
      return line;
    }

    return '';
  }
}
