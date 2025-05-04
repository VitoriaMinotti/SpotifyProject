import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService],
        });
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return true if the user is logged in', () => {
        localStorage.setItem('access_token', 'mock_access_token');
        localStorage.setItem('expires_in', '3600');
        expect(service.isLoggedIn()).toBeTrue();
    });

    it('should return false if the user is not logged in', () => {
        localStorage.removeItem('access_token');
        expect(service.isLoggedIn()).toBeFalse();
    });

    it('should logout and remove items from localStorage', () => {
        localStorage.setItem('access_token', 'mock_access_token');
        localStorage.setItem('refresh_token', 'mock_refresh_token');
        localStorage.setItem('expires_in', '3600');
        localStorage.setItem('verifier', 'mock_verifier');

        service.logout();

        expect(localStorage.getItem('access_token')).toBeNull();
        expect(localStorage.getItem('refresh_token')).toBeNull();
        expect(localStorage.getItem('expires_in')).toBeNull();
        expect(localStorage.getItem('verifier')).toBeNull();
    });
});
