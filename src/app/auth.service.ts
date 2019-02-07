import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  register(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      console.log('register code:', error.code);
      console.log('register message:', error.message);
    });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      console.log('signin code:', error.code);
      console.log('signin message:', error.message);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
