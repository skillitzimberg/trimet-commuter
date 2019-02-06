import { Component, Output, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';

import { LoginComponent } from '../login/login.component';
import { RecentSearchComponent } from '../recent-search/recent-search.component';

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
  @Output() toggleNav = new EventEmitter()
  
  sideBarMessage;
  user;

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
