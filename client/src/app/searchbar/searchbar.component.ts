import { Component, OnInit } from '@angular/core';
import { SongdataService } from '../songdata.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Song } from '../models';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  songs: any;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(private songdata: SongdataService) {
    this.getSongs();
  }
  ngOnInit() {
    this.getSongs();
    this.filtering();
  }
  filtering() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  getSongs() {
    this.songdata.getAllSongs().subscribe((post) => {
      this.songs = post;
    });
  }
  private _filter(value: string): string[] {
    this.getSongs();
    const filterValue = value.toLowerCase();
    return this.songs.filter(
      (option) => option.startWith(filterValue)
    );
  }
}
