import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddSongDialog, AddArtistDialog } from './dialog/dialog.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { LayoutComponent, CardLayoutComponent, StarRatingComponent } from './layout/layout.component';
import { TopArtistsComponent, TopSongsComponent, TopContentComponent } from './topcontent/topcontent.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ChipsComponent } from './chips/chips.component';
import {SearchSongsComponent} from './chips/songs.chips.component';
import {SearchArtistsComponent} from './chips/artists.chips.component';
import { HomeComponent } from './home/home.component'

@NgModule({
  declarations: [
    AppComponent,
    AddSongDialog,
    StarRatingComponent,
    AddArtistDialog,
    LayoutComponent,
    TopArtistsComponent,
    TopSongsComponent,
    TopContentComponent,
    CardLayoutComponent,
    SearchbarComponent,
    ChipsComponent,
    SearchSongsComponent,
    SearchArtistsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
