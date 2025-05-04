import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../interceptor';

describe('Interceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
        AuthService,
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);

    spyOn(authService, 'getToken').and.returnValue('mock_token');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header with Bearer token', () => {
    httpClient.get('https://api.spotify.com/v1/me').subscribe();

    const req = httpMock.expectOne('https://api.spotify.com/v1/me');
    expect(req.request.headers.has('Authorization')).toBeTrue(); 
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock_token');  
    req.flush({});
  });

  it('should not add Authorization header for token and authorize URLs', () => {
    httpClient.post('https://accounts.spotify.com/api/token', {}).subscribe();
    const req = httpMock.expectOne('https://accounts.spotify.com/api/token');
    expect(req.request.headers.has('Authorization')).toBeFalse(); 
    req.flush({});

    httpClient.get('https://accounts.spotify.com/authorize').subscribe();
    const req2 = httpMock.expectOne('https://accounts.spotify.com/authorize');
    expect(req2.request.headers.has('Authorization')).toBeFalse(); 
    req2.flush({});
  });
});
