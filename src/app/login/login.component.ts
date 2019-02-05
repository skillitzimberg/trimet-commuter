import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {
  @Output() messageNotification = new EventEmitter()
  user;

  showRegisterDiv: boolean = false;
  showLoginDiv: boolean = false;

  constructor( public authService: AuthService ) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
    });

    this.messageNotification.subscribe(console.log('message changed'))
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
    this.authService.login(email, password);
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
