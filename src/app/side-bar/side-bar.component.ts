import { Component, Output, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { LoginComponent } from '../login/login.component';

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
export class SideBarComponent {
  sideBarMessage;
  // messageFromLogin;

  @Output() toggleNav = new EventEmitter()

  closeNav() {
    this.toggleNav.emit();
  }

  messageFromLogin(msg) {
    this.sideBarMessage = msg;
  }


}
