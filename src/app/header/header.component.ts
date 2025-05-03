import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/service/spotify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchQuery: string = '';

  constructor(
    private service: SpotifyService,
    private router: Router
  ) { }

  
  onSearch(): void {
    const query = this.searchQuery.trim();
    if (query) {
      this.router.navigate(['/artist-search-result'], { queryParams: { q: query } });
      this.searchQuery = '';
    }
  }

  goHome(): void {
    this.router.navigate(['']);
  }
}
