import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category/category';

import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit { 
  categoryList: Category[] = [];
  defaultList: Category[] = [];
  select: string;
  @Input() searchValue: string = '';

  constructor( private categoryService: CategoriesService ) { }
  
  ngOnInit(): void {
    this.categoryService.selectedCategory.subscribe((response) => {
      this.select = response;
      this.filterData();
    })
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categoryService.updateCategories(data);
    });

  }

  filterData() {
    this.categoryService.updateSubject.subscribe((data)=>{
      this.defaultList = data;
      if(this.select === 'All Category') {
        this.categoryList = this.sortBasedOnAll(this.defaultList);
      } else if( this.select === 'Popular') {
        this.categoryList = this.sortBasedOnPopular(this.defaultList)
      }
    })  
  }

  matchSearchValue(category:Category) {
    return (this.searchValue ==='' || category.name.toLowerCase().includes(this.searchValue) || category.description.toLowerCase().includes(this.searchValue))
  }

  sortBasedOnPopular(datalist : Category[]) {
    return datalist.sort((a,b) => b.questionsCount - a.questionsCount);
  }

  sortBasedOnAll(datalist: Category[]) {
    return datalist.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

}
