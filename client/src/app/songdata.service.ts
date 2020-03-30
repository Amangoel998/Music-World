import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Song} from './models';
@Injectable({
  providedIn: 'root'
})
export class SongdataService {
  searchOption=[]
  public songs: Song[]
  postUrl : string = "https://jsonplaceholder.typicode.com/posts";
  constructor(private http: HttpClient) { }
  ngOnInit(){
    this.getPosts();
  }
  getPosts(): Observable<Song[]>{
    return this.http.get<Song[]>(this.postUrl);
  }
  filteredListOptions() {
    let posts = this.songs;
    let filteredPostsList = [];
    for (let post of posts) {
        for (let options of this.searchOption) {
            if (options.title === post.name) {
              filteredPostsList.push(post);
            }
        }
    }
    console.log(filteredPostsList);
    return filteredPostsList;
  }
}
