import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumDetailsComponent } from '../album-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AlbumDetails } from 'src/service/spotify.interface';
import { HttpClientModule } from '@angular/common/http';

describe('AlbumDetailsComponent', () => {
  let component: AlbumDetailsComponent;
  let fixture: ComponentFixture<AlbumDetailsComponent>;
  let routeMock: jasmine.SpyObj<ActivatedRoute>;

  const mockAlbumDetails: AlbumDetails = {
    album_type: 'album',
    total_tracks: 10,
    available_markets: ['US', 'BR', 'GB'],
    external_urls: {
      spotify: 'https://open.spotify.com/album/mock-id'
    },
    href: 'https://api.spotify.com/v1/albums/mock-id',
    id: 'mock-id',
    images: [
      {
        url: 'https://i.scdn.co/image/mock-image-url',
        height: 640,
        width: 640
      }
    ],
    name: 'Mock Album',
    release_date: '2023-01-01',
    release_date_precision: 'day',
    restrictions: {
      reason: 'market'
    },
    type: 'album',
    uri: 'spotify:album:mock-id',
    artists: [
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/mock-artist-id'
        },
        href: 'https://api.spotify.com/v1/artists/mock-artist-id',
        id: 'mock-artist-id',
        name: 'Mock Artist',
        type: 'artist',
        uri: 'spotify:artist:mock-artist-id'
      }
    ],
    tracks: {
      href: 'https://api.spotify.com/v1/albums/mock-id/tracks',
      limit: 50,
      next: '',
      offset: 0,
      previous: '',
      total: 10,
      items: [
        {
          name: 'Mock Track 1',
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/mock-artist-id'
              },
              href: 'https://api.spotify.com/v1/artists/mock-artist-id',
              id: 'mock-artist-id',
              name: 'Mock Artist',
              type: 'artist',
              uri: 'spotify:artist:mock-artist-id'
            }
          ],
          available_markets: ['US', 'BR'],
          disc_number: 1,
          duration_ms: 210000,
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/track/mock-track-id'
          },
          href: 'https://api.spotify.com/v1/tracks/mock-track-id',
          id: 'mock-track-id',
          is_playable: true,
          track_number: 1,
          type: 'track',
          uri: 'spotify:track:mock-track-id',
          is_local: false,
          preview_url: 'https://p.scdn.co/mp3-preview/mock-preview.mp3'
        }
      ]
    },
    copyrights: [
      {
        text: '© 2023 Mock Records',
        type: 'C'
      }
    ],
    external_ids: {
      isrc: 'US-MOCK-1234567',
      ean: '1234567890123',
      upc: '123456789012'
    },
    genres: ['pop', 'rock'],
    label: 'Mock Records',
    popularity: 85
  };

  beforeEach(async () => {
    routeMock = jasmine.createSpyObj('ActivatedRoute', [], {
      data: of({ details: mockAlbumDetails })
    });

    await TestBed.configureTestingModule({
      declarations: [AlbumDetailsComponent],
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set album data from route resolver', () => {
    expect(component.album).toEqual(mockAlbumDetails);
  });

});
