import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { AddCategoryComponent } from '../add-category/add-category.component';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-category-actions',
  templateUrl: './category-actions.component.html',
})
export class CategoryActionsComponent implements OnInit {
  selectedCategory: string = 'All Category';
  searchValue: string = '';
  @Output() searchItemEntered: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {}

  addCategory() {
    this.bsModalRef = this.modalService.show(AddCategoryComponent, {
      class: 'small-modal',
    });
  }

  onSearchItemEntered() {
    this.searchItemEntered.emit(this.searchValue);
  }

  resetFilters() {
    this.searchValue = '';
    this.selectedCategory = 'All Category';
    this.categoriesService.setSelectedCategory(this.selectedCategory);
    this.onSearchItemEntered();
  }

  selectedCategoryFilter() {
    this.categoriesService.setSelectedCategory(this.selectedCategory);
  }
}
