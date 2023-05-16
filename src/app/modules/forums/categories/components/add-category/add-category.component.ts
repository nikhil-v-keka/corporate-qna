import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { AddCategory } from 'src/app/shared/models/category/add-category';
import { Category } from 'src/app/shared/models/category/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  newCategory:AddCategory;

  constructor(
    private bsModalRef: BsModalRef,
    private categoriesService:CategoriesService
    ) { }

  ngOnInit(): void {
    this.intializeForm();
  }

  onClose() {
    this.bsModalRef.hide();
  }

  intializeForm(){
    this.categoryForm = new FormGroup({
      name:new FormControl("",[Validators.required]),
      description:new FormControl("",[Validators.required])
    });
  }

  onSubmit(){
      this.newCategory = this.categoryForm.value;
      this.categoriesService.addCategory(this.newCategory).subscribe((data: Category[])=>{
        this.categoriesService.getCategories().subscribe((data: Category[]) => {
          this.categoriesService.updateCategories(data);
        });
      })
      this.onClose();
  }

}
