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

  constructor(private dataService:SongdataService) { }
  songs: Song[]
  ngOnInit(): void {
  }
  getSongs(){
    this.dataService.getAllSongs().subscribe(post => {
      this.songs = post
      this.dataService.allSongs = post
    });
  }
}
