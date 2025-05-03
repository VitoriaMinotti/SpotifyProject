import { Inject, inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/auth/auth-guard';
import { SpotifyService } from 'src/service/spotify.service';
import { ArtistSearchResultComponent } from './artist-search-result/artist-search-result.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { map, switchMap } from 'rxjs';
import { AlbumDetailsComponent } from './album-details/album-details.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: () => inject(SpotifyService).getMyTopArtists(10, 5)
    }
  },
  {
    path: 'artist-search-result',
    component: ArtistSearchResultComponent,
  },
  {
    path: 'artist-details/:id',
    component: ArtistDetailsComponent,
    resolve: {
      details: (route: ActivatedRouteSnapshot) => {
        const id = route.paramMap.get('id');

        if (id === null) {
          throw new Error('ID not found');
        }

        const spotifyService = inject(SpotifyService);
        return spotifyService.getArtistById(id).pipe(
          switchMap(artistDetails => {
            return spotifyService.getArtistAlbum(id, 10, 5).pipe(
              map(albums => {
                return {
                  artist: artistDetails,
                  albums: albums.items
                };
              })
            );
          })
        );
      }
    }
  },
  {
    path: 'album-details/:id',
    component: AlbumDetailsComponent,
    resolve: {
      details: (route: ActivatedRouteSnapshot) => {
        const id = route.paramMap.get('id');
        if (id === null) {
          throw new Error('ID not found');
        }
        return inject(SpotifyService).getAlbumDetails(id);  
      }
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'callback',
    component: CallbackComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
