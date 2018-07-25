import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class SpotifyService {
  artistas: any[] = [];

  urlSpotify: string = 'https://api.spotify.com/v1/';
  toke: string = 'BQCw1NLKB3pTy6-Y-W-JB8ifCy7lj4FjFKAU06248zVwXmoqoIP5CELpvau1bzp0rzFegb4jAJIuPjNTpRc';

  constructor(public http: HttpClient) {
    console.log('servicio de spotify listo!');
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.toke
    });
    return headers;
  }

  getArtistas(termino: string) {
    const url = `${
      this.urlSpotify
    }search?query=${termino}&type=artist&market=US&limit=20`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers }).pipe(
      map((resp: any) => {
        this.artistas = resp.artists.items;
        return this.artistas;
      })
    );
  }

  getArtista(id: string) {
    const url = `${this.urlSpotify}artists/${id}`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  getTop(id: string) {
    const url = `${this.urlSpotify}artists/${id}/top-tracks?country=us`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }
}
