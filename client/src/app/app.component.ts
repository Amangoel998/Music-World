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
  opened = true;
  title='Music World';
  
  mode: FormControl = new FormControl('over');

  ngOnInit() {
  }
  constructor(public dialog: MatDialog) {}

  addSongDialog(): void {
    const dialogRef = this.dialog.open(AddSongDialog, {
      width: '600px',
      height: '400px'
    });
  }
  addArtistDialog(): void {
    const dialogRef = this.dialog.open(AddArtistDialog, {
      width: '600px',
      height: '400px'
    });
  }
}
