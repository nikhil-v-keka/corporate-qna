import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {

  searchValue: string = "";
  
  findSearchElement(data:any) {
    this.searchValue = data;
   }
}
