import { Component, OnInit } from '@angular/core';
import { SongdataService } from '../songdata.service';

interface Song{

}

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor(private songdata:SongdataService) { }
  songs: any
  ngOnInit(): void {
  }
  getSongs(){
    this.songdata.getAllSongs().subscribe(post => {
      this.songs = post
    });
  }
}
