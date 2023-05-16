import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { AddQuestionComponent } from '../add-question/add-question.component';
import { Category } from 'src/app/shared/models/category/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { HomeService } from 'src/app/shared/services/home.service';
import { QuestionsService } from 'src/app/shared/services/questions.service';
import { SortedByFilter } from 'src/app/shared/models/filters/sortByFilter';
import { ShowByFilter } from 'src/app/shared/models/filters/showByFilter';

@Component({
  selector: 'app-home-actions',
  templateUrl: './home-actions.component.html',
})
export class HomeActionsComponent implements OnInit {
  selectedSorted: string = 'All';
  selectedShowFilter: string = 'All';
  selectedCategory: string = 'All';
  sortFilters: SortedByFilter[] = [];
  showFilters: ShowByFilter[] = [];
  categoryFilters: Category[] = [];
  searchValue: string = '';
  isValidFilters = false;

  constructor(
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private categoriesService: CategoriesService,
    private homeService: HomeService,
    private questionService: QuestionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getShowFilters();
    this.getSortFilters();
  }

  addQuestion() {
    this.bsModalRef = this.modalService.show(AddQuestionComponent, {
      class: 'small-modal',
    });
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((data: Category[]) => {
      data.forEach((element) => {
        this.categoryFilters.push({ name: element.name, id: element.id });
      });
    });
  }

  getShowFilters() {
    this.showFilters = this.homeService.getShowFilters();
  }

  getSortFilters() {
    this.sortFilters = this.homeService.getSortFilters();
  }

  onSelectedCategory(value: string) {
    this.homeService.setSelectedCategoryHome(value);
    this.navigateToHome();
  }

  onSelectedShowFilter(value: string) {
    this.homeService.setSelectedShowFilter(value);
    this.navigateToHome();
  }

  onSelectedSortFilter(value: string) {
    this.homeService.setSelectedSortFilter(value);
    this.navigateToHome();
  }

  onSearchItemEntered() {
    this.questionService.updateSearchValue(this.searchValue);
    this.navigateToHome();
  }

  resetFilters() {
    this.searchValue = '';
    this.onSearchItemEntered();
    this.selectedCategory = 'All';
    this.selectedShowFilter = 'All';
    this.selectedSorted = 'All';
    this.setDefaultFilter();
  }

  setDefaultFilter() {
    this.homeService.homeFilters.next({
      categoryId: 'all',
      showFilter: 'all',
      sortFilter: 'all',
    });
  }

  navigateToHome() {
    this.router.navigateByUrl('/forums');
  }
}
