import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AddSongDialog, AddArtistDialog } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  opened = true;
  
  mode: FormControl = new FormControl('over');

  constructor(public dialog: MatDialog, private auth:AuthService, private router: Router) {}

  ngOnInit() {
    if(!this.auth.isLoggedIn){
      console.log("Not auth")
      this.router.navigate(['/register']);
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
