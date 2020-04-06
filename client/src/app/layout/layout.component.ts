import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  ViewEncapsulation,
  Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Song, Artist, Image } from '../models';
import { SongdataService } from '../songdata.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
@Component({
  selector: 'app-cardlayout',
  templateUrl: './songcard.component.html',
  styleUrls: ['./layout.component.css'],
})
export class CardLayoutComponent implements OnInit {
  @Input() rowIndex: number;
  @Input() song: Song;
  public song_name: String;
  public song_artists: [Artist];
  public song_artists_name;
  public song_album: String;
  public rating: Number;
  starCount: Number = 5;
  public img_src;
  constructor(
    private songservice: SongdataService
  ) {}
  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  ngOnInit(): void {
    this.song_artists = this.song.song_artists;
    this.song_artists_name = this.song_artists.map((e) => e.artist_name);
    this.song_name = this.song.song_name;
    this.song_album = this.song.song_album;
    this.rating = this.song.avg_rating;
    this.convertToImage(this.song.song_cover);
  }

  convertToImage(songData) {
    let image;
    this.songservice.getImage(songData).subscribe((el:any) => {
      let base64Flag = 'data:image/jpeg;base64,';
      let imageStr = this.arrayBufferToBase64(el.data.data);
      this.img_src = base64Flag + imageStr;
    });
    
  }
  onRatingChanged(rating) {
    this.rating = rating;
  }
}

@Component({
  selector: 'mat-star-rating',
  templateUrl: './starrating.component.html',
  styleUrls: ['./layout.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class StarRatingComponent implements OnInit {
  @Input('rating') rating: number = 3;
  @Input('starCount') starCount: number = 5;
  color: String = 'accent';
  @Output() ratingUpdated = new EventEmitter();

  private snackBarDuration: number = 2000;
  ratingArr = [];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating: number) {
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration,
    });
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
