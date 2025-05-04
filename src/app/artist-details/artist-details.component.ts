import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist, ArtistAlbum } from 'src/service/spotify.interface';
import { SpotifyService } from 'src/service/spotify.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css']
})
export class ArtistDetailsComponent implements OnInit {

  artist: Artist | null = null;
  albums: ArtistAlbum[] = [];
  limit = 4;
  offset = 0;
  total = 0;
  pageCount = 0;
  currentPage = 1;
  @Input() detailRoute: string = 'album-details';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: SpotifyService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.service.getArtistById(id).subscribe(artist => {
          this.artist = artist;

          this.loadArtistAlbums(id);
        });
      }
    });
  }

  loadArtistAlbums(id: string): void {
    this.service.getArtistAlbum(id, this.limit, this.offset).subscribe((response: any) => {
      this.albums = response.items;
      this.total = response.total;
      this.pageCount = Math.ceil(this.total / this.limit);
      this.currentPage = this.offset / this.limit + 1;
    });
  }

  goToPage(page: number): void {
    this.offset = (page - 1) * this.limit;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadArtistAlbums(id);
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.pageCount) {
      this.goToPage(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  get pageNumbers(): number[] {
    return Array(this.pageCount)
      .fill(0)
      .map((_, i) => i + 1);
  }

  albumDetails(id: string) {
    this.router.navigate(['/album-details', id]);
  }
}
