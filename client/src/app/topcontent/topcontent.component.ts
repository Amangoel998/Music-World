import { Component, OnInit } from '@angular/core';
import {Artist, Song} from '../models';
@Component({
  selector: 'app-topartists',
  templateUrl: './topartists.component.html',
  styleUrls: ['./topcontent.component.css']
})
export class TopArtistsComponent implements OnInit {
  consructor() { }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
  displayedColumns: string[] = ['index', 'name', 'songs', 'dob'];
  artists_list: Array<Artist> = [
    { name: 'Hydrogen', songs: ['A', 'B'].join(', '), dob: new Date('2016-12-1').toDateString() },
    { name: 'Helium', songs: ['C', 'D'].join(', '), dob: new Date('2016-12-1').toDateString() },
    { name: 'Lithium', songs: ['B', 'L'].join(', '), dob: new Date('2016-12-1').toDateString() },
    { name: 'Beryllium', songs: ['A', 'B'].join(', '), dob: new Date('2016-12-1').toDateString() },
    { name: 'Boron', songs: ['A', 'B'].join(', '), dob: new Date('2016-12-1').toDateString() },
    { name: 'Carbon', songs: ['A', 'B'].join(', '), dob: new Date('2016-12-1').toDateString() },
    { name: 'Nitrogen', songs: ['A', 'B'].join(', '), dob: new Date('2016-12-1').toDateString() },
    { name: 'Oxygen', songs: ['A', 'B'].join(', '), dob: new Date('2016-12-1').toDateString() },
    { name: 'Fluorine', songs: ['A', 'B'].join(', '), dob: new Date('2016-12-1').toDateString() },
    { name: 'Neon', songs: ['A', 'B'].join(', '), dob: new Date('2016-12-1').toDateString() }
  ]; 
}
@Component({
  selector: 'app-topsongs',
  templateUrl: './topsongs.component.html',
  styleUrls: ['./topcontent.component.css']
})
export class TopSongsComponent implements OnInit {
  songs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor() { }

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

}

@Component({
  selector: 'app-topcontent',
  templateUrl: './topcontent.component.html',
  styleUrls: ['./topcontent.component.css']
})
export class TopContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

}
