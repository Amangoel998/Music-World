import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SongdataService } from '../songdata.service';
import { Song } from '../models';

@Component({
  selector: 'search-songs',
  templateUrl: './songs.chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class SearchSongsComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  allPosts: Song[];
  autoCompleteList: any[];

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(public dataService: SongdataService) {}

  ngOnInit() {
    this.getSongs;
    this.onChangeValue;
  }
  getSongs() {
    // get all the post
    this.dataService.getPosts().subscribe(posts => {
      this.allPosts = posts;
    });
  }
  onChangeValue() {
    // when user types something in input, the value changes will come through this
    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    });
  }
  private autoCompleteExpenseList(input) {
    let categoryList = this.filterCategoryList(input);
    this.autoCompleteList = categoryList;
  }

  // this is where filtering the data happens according to you typed value
  filterCategoryList(val) {
    var categoryList = [];
    if (typeof val != 'string') {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val
      ? this.allPosts.filter(
          s => s.name.toLowerCase().indexOf(val.toLowerCase()) != -1
        )
      : this.allPosts;
  }

  // after you clicked an autosuggest option, this function will show the field you want to show in input
  displayFn(post: Song) {
    let k = post ? post.name : post;
    return k;
  }

  filterPostList(event) {
    var posts = event.source.value;
    if (!posts) {
      this.dataService.searchOption = [];
    } else {
      this.dataService.searchOption.push(posts);
      this.onSelectedOption.emit(this.dataService.searchOption);
    }
    this.focusOnPlaceInput();
  }

  removeOption(option) {
    let index = this.dataService.searchOption.indexOf(option);
    if (index >= 0) this.dataService.searchOption.splice(index, 1);
    this.focusOnPlaceInput();

    this.onSelectedOption.emit(this.dataService.searchOption);
  }

  // focus the input field and remove any unwanted text.
  focusOnPlaceInput() {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }
}
