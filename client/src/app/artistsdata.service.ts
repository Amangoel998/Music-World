import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Artist} from './models';
@Injectable({
  providedIn: 'root'
})
export class ArtistsdataService implements OnInit{
  mainUrl : string = "http://localhost:5000/api/artists/";
  topUrl : string = "http://localhost:5000/api/topartists/";
  constructor(private http: HttpClient) { }
  ngOnInit(){
    this.getAllArtists();
  }
  getAllArtists(): Observable<Artist[]>{
    return this.http.get<Artist[]>(this.mainUrl);
  }
  getTopArtists(): Observable<Artist[]>{
    return this.http.get<Artist[]>(this.topUrl);
  }
  // filteredListOptions() {
  //   let posts = this.artists;
  //   let filteredPostsList = [];
  //   for (let post of posts) {
  //       for (let options of this.searchOption) {
  //           if (options.title === post.artist_name) {
  //             filteredPostsList.push(post);
  //           }
  //       }
  //   }
  //   console.log(filteredPostsList);
  //   return filteredPostsList;
  // }

}
