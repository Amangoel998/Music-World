import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ArtistsdataService } from '../artistsdata.service';
import { SongdataService } from '../songdata.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-songdialog',
  templateUrl: './addsongdialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class AddSongDialog implements OnInit {
  public artists: [String];
  public filedata;
  public imgMIME: string;
  public imgURL: string;
  public message: string;
  public err: string;
  public success: string;
  public starCount = 5;
  public rating: number = 3;
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    artists: new FormControl('', [Validators.required]),
    releasedate: new FormControl('', [Validators.required]),
    album: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(
    private artistsdata: ArtistsdataService,
    private songdata: SongdataService,
    public dialogRef: MatDialogRef<AddSongDialog>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getArtists();
  }
  getArtists() {
    this.artistsdata.getAllArtists().subscribe((e: any) => (this.artists = e));
  }

  onRatingChanged(rating) {
    this.rating = rating;
  }
  dataUrlToFile(dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new File([u8arr], this.form.value.name, { type: mime });
    return file;
  }
  preview(files) {
    if (files.length === 0) return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    this.filedata = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = <string>reader.result;
    };
    this.imgMIME = mimeType;
  }
  submit(): void {
    if (this.form.valid) {
      const payload = {
        name: this.form.value.name,
        artists: this.form.value.artists,
        releasedate: this.form.value.releasedate.toISOString().slice(0, 10),
        cover_image: {
          data: this.imgURL.split(',')[1],
          contentType: this.imgMIME,
        },
        album: this.form.value.album,
        user_rating: this.rating,
      };
      console.log(payload.cover_image);
      this.songdata.addSong(payload).subscribe(
        (res: any) => {
          if (res) this.success = res.message;
          else if (res) {
            console.log(res.error);
            this.err = res.error;
          }
          this.dialogRef.close();
        },
        (err) => {
          this.err = 'Invalid Credentials';
        }
      );
    } else this.err = 'Form is Invalid';
  }

  addArtistDialog(): void {
    this.dialog.open(AddArtistDialog, {
      width: '300px',
      height: '320px',
    });
    this.getArtists();
  }
}
@Component({
  selector: 'app-artistdialog',
  templateUrl: './addartistdialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class AddArtistDialog implements OnInit {
  public err: string;
  public success: string;
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    dob: new FormControl(''),
    bio: new FormControl(''),
  });
  constructor(
    private artistdata: ArtistsdataService,
    public dialogRef: MatDialogRef<AddArtistDialog>
  ) {}

  ngOnInit(): void {}

  submit(): void {
    let result;
    if (this.form.valid) {
      result = this.artistdata
        .addArtist({
          name: this.form.value.name,
          dob: this.form.value.dob.toISOString().slice(0, 10),
          bio: this.form.value.bio,
        })
        .subscribe(
          (res: any) => {
            this.success = res.message;
            this.dialogRef.close();
          },
          (err) => {
            this.err = 'Invalid Credentials';
          }
        );
    } else this.err = 'Form is Invalid';
  }
}

@Component({
  selector: 'mat-user-rating',
  template: `<button
    mat-icon-button
    [color]="color"
    *ngFor="let ratingId of ratingArr; index as i"
    [id]="'star_' + i"
    (click)="onClick(i + 1)"
    [matTooltip]="ratingId + 1"
    matTooltipPosition="above"
  >
    <mat-icon>
      {{ showIcon(i) }}
    </mat-icon>
  </button> `,
})
export class UserRatingComponent implements OnInit {
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
