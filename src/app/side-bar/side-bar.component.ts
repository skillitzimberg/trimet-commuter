import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';

import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';
// import { clearInterval } from 'timers';

@NgModule({
  declarations: [
    LoginComponent
  ]
})

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  constructor( private authService: AuthService ) {  }

  ngOnInit() { 
    this.authService.user.subscribe( (user) => {
      if (user) { this.user = user; }
      else { this.user = null; }
    });
  }

  @Output() toggleNav = new EventEmitter()
  
  hideInterrupted;
  pendingHide; 
  sideBarMessage;
  user;

  closeNav() {
    this.toggleNav.emit();
  }

  messageFromLogin(msg) {
    this.sideBarMessage = msg;

    const autoClearNotification = setInterval(()=>{
      this.sideBarMessage = null;
      clearInterval(autoClearNotification);
    },3000);
  }

  hideBar() {
    setTimeout( () => { this.closeNav() }, 333);


  }


 

}
