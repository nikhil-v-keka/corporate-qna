import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-filters',
  templateUrl: './user-filters.component.html',
})
export class UserFiltersComponent implements OnInit {
  @Output() searchItemEntered:EventEmitter<string> = new EventEmitter<string>();
  searchValue: string = "";
  
  constructor() { }

  ngOnInit(): void { }

  onSearchItemEntered() {
    this.searchItemEntered.emit(this.searchValue);
  }
}
