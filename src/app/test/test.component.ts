import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { UserDataService } from '../user-data.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [AuthService, UserDataService]
})
export class TestComponent implements OnInit {
  private user;
  private userData = this.userDataService.initializeUserData();
  private userDataObservable: Observable<{}>;

  constructor(public authService: AuthService, public userDataService: UserDataService) {
    authService.user.subscribe((user) => {
      this.user = user;
      console.log("test user", this.user);

      this.userDataObservable = userDataService.getUserDataObsrvable();
      this.userDataObservable.subscribe((userData) => {
        this.userData = userData;
        console.log("test data", this.userData)
      });
    });
  }

  ngOnInit() {
  }

}
