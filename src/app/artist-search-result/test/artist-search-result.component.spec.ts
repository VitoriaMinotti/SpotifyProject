import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistSearchResultComponent } from '../artist-search-result.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/service/spotify.service';
import { of, throwError } from 'rxjs';

describe('ArtistSearchResultComponent', () => {
  let component: ArtistSearchResultComponent;
  let fixture: ComponentFixture<ArtistSearchResultComponent>;
  let spotifyServiceSpy: jasmine.SpyObj<SpotifyService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    spotifyServiceSpy = jasmine.createSpyObj('SpotifyService', ['search']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ArtistSearchResultComponent],
      providers: [
        { provide: SpotifyService, useValue: spotifyServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ q: 'Test Artist' })
          }
        }
      ]
    });

    fixture = TestBed.createComponent(ArtistSearchResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set notFound to true when no exact match is found', () => {
    const mockArtist = {
      id: '123',
      name: 'Another Artist',
      images: [{ url: 'some-image-url' }]
    };

    spotifyServiceSpy.search.and.returnValue(of({
      artists: {
        items: [mockArtist]
      }
    }));

    fixture.detectChanges();

    expect(component.artist).toBeNull();
    expect(component.notFound).toBeTrue();
  });

  it('should handle search error and set notFound to true', () => {
    spotifyServiceSpy.search.and.returnValue(throwError(() => new Error('API Error')));

    fixture.detectChanges();

    expect(component.artist).toBeNull();
    expect(component.notFound).toBeTrue();
  });

  it('should navigate to artist details on artistDetails()', () => {
    const artist = { id: 'abc' };
    component.artistDetails(artist);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['artist-details', 'abc']);
  });
});
