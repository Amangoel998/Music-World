import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Song } from './models';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class SongdataService {
  public searchOption = [];
  public topSongs: Song[];
  public allSongs: Song[];
  private songsURL: string = 'http://localhost:5000/api/songs/';
  private topsongsURL: string = 'http://localhost:5000/api/topsongs/';
  private imageURL: string = 'http://localhost:5000/api/images/'
  constructor(private http: HttpClient, private auth: AuthService) {}
  ngOnInit() {
    this.getAllSongs();
  }
  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.songsURL);
  }
  getTopSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.topsongsURL);
  }
  addSong(newsong): Observable<Song>{
    return this.http.post<Song>(this.songsURL, newsong);
  }
  getImage(image): Observable<any>{
    return this.http.get<any>(this.imageURL+image);
  }
  filteredListOptions() {
    let posts = this.allSongs;
    let filteredPostsList = [];
    for (let post of posts) {
      for (let options of this.searchOption) {
        if (options.title === post.song_name) {
          filteredPostsList.push(post);
        }
      }
    }
    console.log(filteredPostsList);
    return filteredPostsList;
  }
}
