import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Artist} from './models';
@Injectable({
  providedIn: 'root'
})
export class ArtistsdataService implements OnInit{
  searchOption=[]
  public artists: Artist[]
  postUrl : string = "https://jsonplaceholder.typicode.com/posts";
  constructor(private http: HttpClient) { }
  ngOnInit(){
    this.getPosts();
  }
  getPosts(): Observable<Artist[]>{
    return this.http.get<Artist[]>(this.postUrl);
  }
  filteredListOptions() {
    let posts = this.artists;
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
