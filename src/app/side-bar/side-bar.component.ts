import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { AuthService } from '../auth.service';


import { LoginComponent } from '../login/login.component';
import { RecentSearchComponent } from '../recent-search/recent-search.component';

// import { interval, fromEvent } from 'rxjs'

@NgModule({
  declarations: [
    LoginComponent,
    RecentSearchComponent
  ]
})

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  
  sideBarMessage;
  user;
  
  @Output() toggleNav = new EventEmitter()

  closeNav() {
    this.toggleNav.emit();
  }

  messageFromLogin(msg) {
    this.sideBarMessage = msg;
  }

  setUser(user) {
    this.user = user;

    const autoClearNotification = setInterval(()=>{
      this.sideBarMessage = null;
      clearInterval(autoClearNotification);
    },3000);
  }

}
