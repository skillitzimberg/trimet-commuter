import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AuthService ]
})
export class LoginComponent {
  user;
  message: string;

  constructor( public authService: AuthService ) {
    this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  register(email: string, password: string, confirmPassword: string) {
    this.message = '';

    if (password === confirmPassword) {
      this.authService.register(email, password);
    } else {
      this.message = "Passwords do not match!";
    }
  }

  login(email: string, password: string) {
    this.authService.login(email, password);
  }

  logout() {
    this.authService.logout();
  }
}
