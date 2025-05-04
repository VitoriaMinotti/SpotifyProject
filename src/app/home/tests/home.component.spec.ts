import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from '../home.component';
import { SpotifyService } from 'src/service/spotify.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { PaginatedResponse, Artist } from 'src/service/spotify.interface';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let spotifyServiceSpy: jasmine.SpyObj<SpotifyService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    spotifyServiceSpy = jasmine.createSpyObj('SpotifyService', ['getMyTopArtists']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    const mockResponse: PaginatedResponse<Artist> = {
      items: [
        {
          id: '1',
          name: 'Artist 1',
          external_urls: { spotify: 'https://spotify.com/artist/1' },
          followers: { href: null, total: 1000 },
          genres: ['Pop'],
          href: 'https://api.spotify.com/v1/artists/1',
          images: [
            { url: 'https://example.com/image1.jpg', height: 300, width: 300 }
          ],
          popularity: 80,
          type: 'artist',
          uri: 'spotify:artist:1'
        },
        {
          id: '2',
          name: 'Artist 2',
          external_urls: { spotify: 'https://spotify.com/artist/2' },
          followers: { href: null, total: 2000 },
          genres: ['Rock'],
          href: 'https://api.spotify.com/v1/artists/2',
          images: [
            { url: 'https://example.com/image2.jpg', height: 300, width: 300 }
          ],
          popularity: 75,
          type: 'artist',
          uri: 'spotify:artist:2'
        }
      ],
      total: 2,
      href: 'https://api.spotify.com/v1/me/top/artists',
      limit: 2,
      offset: 0,
      next: null,
      previous: null
    };

    spotifyServiceSpy.getMyTopArtists.and.returnValue(of(mockResponse));

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CommonModule,
        HomeComponent
      ],
      providers: [
        { provide: SpotifyService, useValue: spotifyServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load top artists on init', () => {
    expect(spotifyServiceSpy.getMyTopArtists).toHaveBeenCalled();
    expect(component.artists.length).toBe(2);
  });

  it('should load top artists on init', () => {
    component.ngOnInit();
    expect(component.artists.length).toBe(2);
    expect(component.total).toBe(2);
    expect(component.pageCount).toBe(1);
    expect(component.currentPage).toBe(1);
  });

  it('should navigate to artist details page', () => {
    const artist = { id: '1', name: 'Artist 1' };
    component.artistDetails(artist);
    expect(routerSpy.navigate).toHaveBeenCalledWith([component.detailRoute, artist.id]);
  });

  it('should go to next page', () => {
    component.total = 6;
    component.limit = 2;
    component.currentPage = 1;
    component.pageCount = 3;
    component.nextPage();
    expect(component.currentPage).toBe(2);
    expect(component.offset).toBe(2);
  });

  it('should go to previous page', () => {
    component.total = 6;
    component.limit = 2;
    component.currentPage = 2;
    component.pageCount = 3;
    component.prevPage();
    expect(component.currentPage).toBe(1);
    expect(component.offset).toBe(0);
  });

  it('should return correct page numbers', () => {
    component.pageCount = 3;
    const pageNumbers = component.pageNumbers;
    expect(pageNumbers.length).toBe(3);
    expect(pageNumbers).toEqual([1, 2, 3]);
  });
});
