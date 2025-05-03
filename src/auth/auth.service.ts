import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private clientId = '0671cb76274540aaa5acbeaf87f0c4cf';
  private redirectUri = 'http://127.0.0.1:4200/callback';

  constructor(private http: HttpClient) { }

  private generateCodeVerifier(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  private async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  async redirectToAuthCodeFlow() {
    const codeVerifier = this.generateCodeVerifier(128);
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    localStorage.setItem('verifier', codeVerifier);

    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', this.redirectUri);
    params.append('scope', 'user-read-private user-read-email user-top-read');
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', codeChallenge);

    document.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  async getAccessToken(code: string): Promise<string> {
    const verifier = localStorage.getItem("verifier");

    const body = new HttpParams()
      .set("client_id", this.clientId)
      .set("grant_type", "authorization_code")
      .set("code", code)
      .set("redirect_uri", this.redirectUri)
      .set("code_verifier", verifier!);

    const headers = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });

    const result = await lastValueFrom(this.http.post<any>("https://accounts.spotify.com/api/token", body, { headers }));

    localStorage.setItem('access_token', result.access_token);
    localStorage.setItem('refresh_token', result.refresh_token);
    localStorage.setItem('expires_in', result.expires_in);

    const { access_token } = result;
    return access_token;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const expiresIn = localStorage.getItem('expires_in');
    if (!expiresIn) {
      return false;
    }

    const expirationDate = new Date(Date.now() + parseInt(expiresIn) * 1000);
    return expirationDate > new Date();
  }

  logout(): void{
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('verifier');
  }

}
