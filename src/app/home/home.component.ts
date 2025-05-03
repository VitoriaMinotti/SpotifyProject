import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Artist } from 'src/service/spotify.interface';
import { SpotifyService } from 'src/service/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
})

export class HomeComponent implements OnInit {
  artists: Artist[] = [];
  limit = 4;
  offset = 0;
  total = 0;
  pageCount = 0;
  currentPage = 1;

  @Input() detailRoute: string = 'artist-details';

  constructor(
    private service: SpotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTopArtists();
  }

  loadTopArtists(): void {
    this.service.getMyTopArtists(this.limit, this.offset).subscribe((res: any) => {
      this.artists = res.items;
      this.total = res.total;
      this.pageCount = Math.ceil(this.total / this.limit);
      this.currentPage = this.offset / this.limit + 1;
    });
  }

  goToPage(page: number): void {
    this.offset = (page - 1) * this.limit;
    this.loadTopArtists();
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

  artistDetails(artist: any) {
    this.router.navigate([this.detailRoute, artist.id]);
  }
}


