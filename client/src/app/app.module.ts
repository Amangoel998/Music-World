import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import {
  LoginFormComponent,
  RegisterFormComponent,
} from './login/form.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddSongDialog, AddArtistDialog } from './dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  LayoutComponent,
  CardLayoutComponent,
  StarRatingComponent,
} from './layout/layout.component';
import {
  TopArtistsComponent,
  TopSongsComponent,
  TopContentComponent,
} from './topcontent/topcontent.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent, RegisterComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthService } from './auth.service';
import { ServerService } from './server.service';
import { SongdataService } from './songdata.service';
import { ArtistsdataService } from './artistsdata.service';

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
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    ServerService,
    SongdataService,
    ArtistsdataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
