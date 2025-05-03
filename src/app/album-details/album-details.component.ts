import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumDetails } from 'src/service/spotify.interface';
import { SpotifyService } from 'src/service/spotify.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {
  album: AlbumDetails | null = null;
  limit = 4;
  offset = 0;

  constructor(
    private route: ActivatedRoute,
    private service: SpotifyService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.album = data['details']; 
      if (this.album) {
        console.log('Álbum com faixas:', this.album);
      }
    });
  }


}