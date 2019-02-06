import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { LoginComponent } from '../login/login.component';
// import { from, Observable } from 'rxjs/observable'

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
export class SideBarComponent implements OnInit{
  sideBarMessage;

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


}
