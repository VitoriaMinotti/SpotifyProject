import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth-guard';
import { AuthService } from '../auth.service';

describe('AuthGuard', () => {
    let authGuard: AuthGuard;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {
        authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'logout']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                AuthGuard,
                { provide: AuthService, useValue: authServiceSpy },
                { provide: Router, useValue: routerSpy }
            ]
        });

        authGuard = TestBed.inject(AuthGuard);
    });

    it('should be created', () => {
        expect(authGuard).toBeTruthy();
    });

    it('should allow activation if user is logged in', () => {
        authServiceSpy.isLoggedIn.and.returnValue(true);

        const result = authGuard.canActivate();

        expect(result).toBe(true);
        expect(authServiceSpy.logout).not.toHaveBeenCalled();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should deny activation and redirect to login if user is not logged in', () => {
        authServiceSpy.isLoggedIn.and.returnValue(false);

        const result = authGuard.canActivate();

        expect(result).toBe(false);
        expect(authServiceSpy.logout).toHaveBeenCalled();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
});
