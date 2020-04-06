import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ServerService } from './server.service';
@Injectable({
  providedIn: 'root'
})
export class ArtistsdataService implements OnInit{
  constructor(private server: ServerService) { }
  ngOnInit(){
    this.getAllArtists();
  }
  
  getAllArtists(): Observable<Object> {
    return this.server.request('GET', 'artists');
  }
  getTopArtists(): Observable<Object> {
    return this.server.request('GET', 'topartists');
  }
  addArtist(newartist): Observable<Object>{
    return this.server.request('POST', 'artists', newartist);
  }
}
