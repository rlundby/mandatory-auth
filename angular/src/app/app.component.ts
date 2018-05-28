import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService) {
    this.user = this.authService._user;
    this.token = this.authService._token;
  }

  user;
  token;
  error;

  login(credentials) {
    // login user using authService.
   this.authService.login(credentials);
   this.user = this.authService._user;
   this.token = this.authService._token;
   this.error = this.authService._error;
  }

  logout() {
    this.authService.logout();
    this.user = this.authService._user;
    this.token = this.authService._token;
  }

  testApi() {
    this.authService.getResource('friends')
  }
}
