import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ShowByFilter } from '../models/filters/showByFilter';
import { SortedByFilter } from '../models/filters/sortByFilter';
import { HomeFilter } from '../models/filters/homeFIlter';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  currentFilters: HomeFilter;
  homeFilters = new BehaviorSubject<HomeFilter>({
    categoryId: 'all',
    showFilter: 'all',
    sortFilter: 'all',
  });

  sortedBy: SortedByFilter[] = [
    { name: 'All' },
    { name: 'Recent' },
    { name: 'Last 10 days' },
    { name: 'Last 30 days' },
  ];
  showFilter: ShowByFilter[] = [
    { name: 'All' },
    { name: 'My Questions' },
    { name: 'My Participation' },
    { name: 'Hot' },
    { name: 'Solved' },
    { name: 'Unsolved' },
  ];

  constructor() {}

  setSelectedCategoryHome(category: string) {
    this.currentFilters = this.homeFilters.value;
    this.currentFilters.categoryId = category;
    this.homeFilters.next(this.currentFilters);
  }

  setSelectedShowFilter(show: string) {
    this.currentFilters = this.homeFilters.value;
    this.currentFilters.showFilter = show;
    this.homeFilters.next(this.currentFilters);
  }

  setSelectedSortFilter(sortItem: string) {
    this.currentFilters = this.homeFilters.value;
    this.currentFilters.sortFilter = sortItem;
    this.homeFilters.next(this.currentFilters);
  }

  getSortFilters() {
    return this.sortedBy;
  }

  getShowFilters() {
    return this.showFilter;
  }
}
