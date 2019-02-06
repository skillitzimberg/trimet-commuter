import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { LoginComponent } from '../login/login.component';
import { RecentSearchComponent } from '../recent-search/recent-search.component';

// import { from, Observable } from 'rxjs/observable'

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
export class SideBarComponent implements OnInit{
  sideBarMessage;
  user;

  ngOnInit() {
    // this.sideBarMessage.subscribe(x=> console.log('change!'))
    
  }
  
  @Output() toggleNav = new EventEmitter()

  closeNav() {
    this.toggleNav.emit();
  }

  messageFromLogin(msg) {
    // this.sideBarMessage = from(msg)
    this.sideBarMessage = msg;
  }

  setUser(user) {
    this.user = user;
    // console.log(user)
  }



}
