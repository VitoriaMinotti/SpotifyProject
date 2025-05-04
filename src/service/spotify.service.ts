import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { AlbumDetails, Artist, ArtistAlbum, PaginatedResponse, } from './spotify.interface';
import { Endpoints } from 'src/service/endpoint';

@Injectable({
    providedIn: 'root',
})

export class SpotifyService {

    constructor(
        private http: HttpClient,
    ) { }

    _artists: BehaviorSubject<PaginatedResponse<Artist>> = new BehaviorSubject<PaginatedResponse<Artist>>({
        href: '',
        limit: 0,
        next: null,
        offset: 0,
        previous: null,
        total: 0,
        items: [],
    });

    _artistsAlbum: BehaviorSubject<PaginatedResponse<ArtistAlbum>> = new BehaviorSubject<PaginatedResponse<ArtistAlbum>>({
        href: '',
        limit: 0,
        next: null,
        offset: 0,
        previous: null,
        total: 0,
        items: [],
    });

    private _albumDetails: BehaviorSubject<AlbumDetails | null> = new BehaviorSubject<AlbumDetails | null>(null);

    get artists$(): Observable<PaginatedResponse<Artist>> {
        return this._artists.asObservable();
    }

    get artistsAlbum$(): Observable<PaginatedResponse<ArtistAlbum>> {
        return this._artistsAlbum.asObservable();
    }

    get albumDetails$(): Observable<AlbumDetails | null> {
        return this._albumDetails.asObservable();
    }

    getMyTopArtists(limit: number, offset: number): Observable<PaginatedResponse<Artist>> {
        return this.http.get<PaginatedResponse<Artist>>(Endpoints.endpoints.getMyTopArtists(), {
            params: {
                limit: limit,
                offset: offset,
            }
        }).pipe(
            tap((response) => {
                this._artists.next(response);
            })
        )
    }

    search(query: string): Observable<any> {
        const params = new HttpParams()
            .set('q', query)
            .set('type', 'artist')

        return this.http.get<any>(Endpoints.endpoints.search(query), { params }).pipe(
            tap((response) => {
                this._artists.next(response.artists);
            })
        );
    }

    getArtistById(id: string): Observable<Artist> {
        return this.http.get<Artist>(Endpoints.endpoints.getArtistsById(id));
    }

    getArtistAlbum(id: string, limit: number, offset: number): Observable<PaginatedResponse<ArtistAlbum>> {
        return this.http.get<PaginatedResponse<ArtistAlbum>>(Endpoints.endpoints.getArtistsAlbum(id), {
            params: {
                limit: limit.toString(),
                offset: offset.toString(),
            }
        }).pipe(
            tap((response) => {
                this._artistsAlbum.next(response);
            })
        );
    }

    getAlbumDetails(id: string): Observable<AlbumDetails> {
        return this.http.get<AlbumDetails>(Endpoints.endpoints.getAlbumDetails(id))
            .pipe(
                tap((response) => {
                    this._albumDetails.next(response);
                })
            );
    }
}
