import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  titulo = 'Maestro de personas';

  constructor(private loginService: LoginService) {

  }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyDcmRWoRRJsmF-SwUX5JwS0AEIj0wxD8vw',
      authDomain: 'listado-personas-b3c43.firebaseapp.com',
    });
  }

  isAuth() {
    return this.loginService.isAuthenticated();
  }

  cerrarSesion() {
    this.loginService.logOut();
  }
}
