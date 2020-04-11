import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AddSongDialog, AddArtistDialog } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog, private auth:ServerService, private router: Router) {
    if(!this.auth.isLoggedIn){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    if(this.auth.isLoggedIn=='false'){
      this.router.navigate(['/login']);
    }
  }
  addSongDialog(): void {
    this.dialog.open(AddSongDialog);
  }
  addArtistDialog(): void {
    this.dialog.open(AddArtistDialog, {
      width: '300px',
      height: '320px',
    });
  }
  logOut(){
    if(this.auth.isLoggedIn)
      this.auth.logout();
  }

}
