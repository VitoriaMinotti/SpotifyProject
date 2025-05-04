import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/auth/auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  styleUrls: ['./callback.component.css'],
  template: '<p>Autenticando...</p>',
})
export class CallbackComponent {
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      this.auth.redirectToAuthCodeFlow();
    } else {
      await this.auth.getAccessToken(code);

      this.router.navigate(['']);
    }
  }
}
