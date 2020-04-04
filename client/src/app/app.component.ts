import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSongDialog, AddArtistDialog } from './dialog/dialog.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title='Music World';
  
  ngOnInit() {
  }
  constructor() {}

}
