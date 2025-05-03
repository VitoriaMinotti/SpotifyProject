import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from 'src/service/spotify.interface';
import { SpotifyService } from 'src/service/spotify.service';

@Component({
  selector: 'app-artist-search-result',
  templateUrl: './artist-search-result.component.html',
  styleUrls: ['./artist-search-result.component.css']
})
export class ArtistSearchResultComponent implements OnInit {

  artist: any = null;
  notFound = false;
  @Input() detailRoute: string = 'artist-details';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: SpotifyService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['q']?.trim()?.toLowerCase();
      if (query) {
        this.service.search(query).subscribe({
          next: result => {
            const artist = result?.artists?.items?.[0];
            if (artist && artist.name.toLowerCase() == query) {
              this.artist = artist;
              this.notFound = false;
            } else {
              this.artist = null;
              this.notFound = true;
            }
          },
          error: () => {
            this.artist = null;
            this.notFound = true;
          }
        });
      }
    });
  }

  artistDetails(artist: any) {
    this.router.navigate([this.detailRoute, artist.id]);
  }
}
