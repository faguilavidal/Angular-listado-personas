import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  token: string;

  constructor(private router: Router) {

  }

  login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      res => {
        firebase.auth().currentUser.getIdToken().then(
          token => {
            this.token = token;
            this.router.navigate(['/']);
          }
        );
      }
    );
  }

  getIdToken() {
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logOut() {
    firebase.auth().signOut().then(
      () => {
        this.token = null;
        this.router.navigate(['login']);
      }
    ).catch(err => console.log('Error de logOut: ' + err));
  }
}
