import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AuthService ]
})

export class LoginComponent implements OnInit {
  @Output() messageNotification = new EventEmitter()
  showRegisterDiv: boolean = false;
  showLoginDiv: boolean = false;
  user;

  constructor( private authService: AuthService ) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user) { this.user = user; }
      else { this.user = null; }
    });

  }

  register(email: string, password: string, confirmPassword: string) {
    if (password === confirmPassword) {
      this.authService.register(email, password);
      this.messageNotification.emit('Account successfully created.');
    } else {
      this.messageNotification.emit('Passwords do not match.');
    }
  }

  login(email: string, password: string) {
    const error = this.authService.login(email, password);
    console.log("login error", error);
    this.messageNotification.emit(`You've successfully logged on`);
  }

  logout() {
    this.authService.logout();
    this.messageNotification.emit(`You're now logged out.`);
  }

  showRegister() {
    this.showRegisterDiv = this.showRegisterDiv ? false: true;
  }

  showLogin() {
    this.showLoginDiv = this.showLoginDiv ? false: true;
  }

}
