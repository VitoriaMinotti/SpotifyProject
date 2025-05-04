import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../header.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from 'src/service/spotify.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let spotifyServiceSpy: jasmine.SpyObj<SpotifyService>;
  let activatedRouteMock: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    spotifyServiceSpy = jasmine.createSpyObj('SpotifyService', ['search']);
    activatedRouteMock = jasmine.createSpyObj('ActivatedRoute', ['paramMap'])

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        HttpClientModule,
        RouterModule,
        FormsModule
      ],
      providers: [
        { provide: SpotifyService, useValue: spotifyServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSearch and navigate with the query', () => {
    const query = 'artist';
    component.searchQuery = query;

    const navigateSpy = spyOn(component['router'], 'navigate');

    component.onSearch();

    expect(navigateSpy).toHaveBeenCalledWith(['/artist-search-result'], { queryParams: { q: query } });
    expect(component.searchQuery).toBe('');
  });

  it('should navigate to home when goHome is called', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');

    component.goHome();

    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

});