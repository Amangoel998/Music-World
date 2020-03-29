import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-songdialog',
  templateUrl: './addsongdialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class AddSongDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddSongDialog>,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  addArtistDialog(): void {
    const dialogRef = this.dialog.open(AddArtistDialog, {
      width: '600px',
      height: '400px'
    });
  }
}
@Component({
  selector: 'app-artistdialog',
  templateUrl: './addartistdialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class AddArtistDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddArtistDialog>) {}

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
