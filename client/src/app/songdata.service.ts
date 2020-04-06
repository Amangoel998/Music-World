import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerService } from './server.service';
@Injectable({
  providedIn: 'root'
})
export class SongdataService {
  public searchOption = [];
  constructor(private server: ServerService) {}
  ngOnInit() {
    this.getAllSongs();
  }
  getAllSongs(): Observable<Object> {
    return this.server.request('GET', 'songs');
  }
  getTopSongs(): Observable<Object> {
    return this.server.request('GET', 'topsongs');
  }
  addSong(newsong): Observable<Object>{
    return this.server.request('POST', 'songs', newsong);
  }
  getImage(image): Observable<Object>{
    return this.server.request('GET', 'images/'+image);
  }
}
