import { Component } from '@angular/core';
import { AuthService } from 'src/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {

  }

  loginWithSpotify() {
    this.auth.redirectToAuthCodeFlow();
  }

}
