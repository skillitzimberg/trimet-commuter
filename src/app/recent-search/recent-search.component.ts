import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserDataService } from '../user-data.service'



@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.css']
})
export class RecentSearchComponent implements OnInit {
  constructor(private authService: AuthService, private userDataService: UserDataService) { }

  ngOnInit() {
    this.authService.user.subscribe( (user)=> {
      if (user) {
        // this.user = user;

        this.userDataService.userData.subscribe( (userDate) => { 
          this.recentSearch = userDate['recent']; 
        });

      } else { this.recentSearch=null}
          
    });
  }

  // user;
  recentSearch;



}
