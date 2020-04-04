import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-songdialog',
  templateUrl: './addsongdialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class AddSongDialog implements OnInit {
  artists_select = new FormControl();
  artists = [
    { artist_name: 'Extra cheese' },
    { artist_name: 'Mushroom' },
    { artist_name: 'Onion' },
    { artist_name: 'Pepperoni' },
    { artist_name: 'Sausage' },
    { artist_name: 'Tomato' },
  ];
  constructor(
    public dialogRef: MatDialogRef<AddSongDialog>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  public imagePath;
  imgURL: any;
  public message: string;

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addArtistDialog(): void {
    this.dialog.open(AddArtistDialog, {
      width: '300px',
      height: '320px',
    });
  }
}
@Component({
  selector: 'app-artistdialog',
  templateUrl: './addartistdialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class AddArtistDialog implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddArtistDialog>) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
