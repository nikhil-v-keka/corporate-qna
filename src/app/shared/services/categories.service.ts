import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';
import { Category } from '../models/category/category';
import { CategoryFilter } from '../models/category/category-filter';
import { AddCategory } from '../models/category/add-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiUrl:string = environment.apiUrl;
  endPoint: string = 'categories';
  updateSubject=new BehaviorSubject<Category[]>([]);
  selectedCategory= new BehaviorSubject<string>('All Category');
  showFilter: CategoryFilter[] = [
    { name: 'All Category' },
    { name: 'Popular' },
   ];
  
  constructor(private apiService:ApiService) {  }

  setSelectedCategory(category: string) {
    this.selectedCategory.next(category);
  }

  getSelectedCategory() {
    return this.selectedCategory.asObservable();
  }

  getCategories() {
    return this.apiService.getMethod(this.endPoint);
  }

  updateCategories(value: Category[]) {
    this.updateSubject.next(value);
  }

  addCategory(category: AddCategory){
    return this.apiService.postMethod(this.endPoint,category);
  }
}
