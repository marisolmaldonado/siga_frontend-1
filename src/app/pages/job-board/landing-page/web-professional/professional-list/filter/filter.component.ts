import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() searchEmitter = new EventEmitter<string>();
  searchControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

  getSearch(): void {
    if (this.searchControl.value == '') {
      this.searchEmitter.emit(null);
    } else {
      this.searchEmitter.emit(this.searchControl.value);
    }
  }

}
