import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './material-module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddSongDialog, AddArtistDialog } from './dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent, CardLayoutComponent } from './layout/layout.component';
import { TopArtistsComponent, TopSongsComponent } from './topcontent/topcontent.component';

@NgModule({
  declarations: [
    AppComponent,
    AddSongDialog,
    AddArtistDialog,
    LayoutComponent,
    TopArtistsComponent,
    TopSongsComponent,
    CardLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
