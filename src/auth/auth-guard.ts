import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthService
    ) { }

    // O método canActivate será chamado para cada tentativa de navegação para uma rota protegida
    canActivate() {
        if (this.auth.isLoggedIn()) {
            return true;
        }

        this.auth.logout();
        this.router.navigate(['/login']);
        return false;
    }
}