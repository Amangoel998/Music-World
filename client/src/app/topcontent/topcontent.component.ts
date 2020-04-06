import { Component, OnInit } from '@angular/core';
import { Artist, Song } from '../models';
import { SongdataService } from '../songdata.service';
import { Observable } from 'rxjs';
import { ArtistsdataService } from '../artistsdata.service';
@Component({
  selector: 'app-topartists',
  templateUrl: './topartists.component.html',
  styleUrls: ['./topcontent.component.css'],
})
export class TopArtistsComponent implements OnInit {
  constructor(private artistservice: ArtistsdataService) {}
  displayedColumns: string[] = ['index', 'name', 'dob', 'bio'];
  artists_list: any
  ngOnInit(): void {
    this.artistservice.getTopArtists().subscribe(e=>{
      this.artists_list=e
    });
  }
}
@Component({
  selector: 'app-topsongs',
  templateUrl: './topsongs.component.html',
  styleUrls: ['./topcontent.component.css'],
})
export class TopSongsComponent implements OnInit {
  public songs;
  constructor(private songservice: SongdataService) {}

  ngOnInit() {
    return this.songservice.getTopSongs().subscribe(song => this.songs = song);
  }
}

@Component({
  selector: 'app-topcontent',
  templateUrl: './topcontent.component.html',
  styleUrls: ['./topcontent.component.css'],
})
export class TopContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
}
