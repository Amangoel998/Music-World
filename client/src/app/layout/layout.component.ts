import { Component, OnInit, Input, EventEmitter, ViewEncapsulation, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
@Component({
  selector: 'app-cardlayout',
  templateUrl: './songcard.component.html',
  styleUrls: ['./layout.component.css']
})
export class CardLayoutComponent implements OnInit {
  @Input() rowIndex:Number;
  rating:number = 3;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;
  constructor() { }

  ngOnInit(): void {}
  onRatingChanged(rating){
    this.rating = rating;
  }

}


@Component({
  selector: 'mat-star-rating',
  templateUrl: './starrating.component.html',
  styleUrls: ['./layout.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingComponent implements OnInit {

  @Input('rating') rating: number = 3;
  @Input('starCount') starCount: number = 5;
  @Input('color')  color: string = 'accent';
  @Output() ratingUpdated = new EventEmitter();

  private snackBarDuration: number = 2000;
  ratingArr = [];

  constructor(private snackBar: MatSnackBar) {
  }


  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating:number) {
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}