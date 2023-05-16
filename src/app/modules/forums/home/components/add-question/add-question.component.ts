import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal'

import { Category } from 'src/app/shared/models/category/category';
import { Question } from 'src/app/shared/models/question/question';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { QuestionsService } from 'src/app/shared/services/questions.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html'
})
export class AddQuestionComponent implements OnInit {
  categoryFilters: Category[] = [];
  questionForm: FormGroup;
  newQuestion: Question;
  currentPage: number = 1;
  questionlimit: number = 4;
  selectedCategory: string = 'All'

  constructor(
    private bsModalRef:BsModalRef,
    private modalService:BsModalService,
    private categoriesService:CategoriesService,
    private questionsService: QuestionsService

    ) { }
    
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((data: Category[]) => {
      data.forEach(element => {
        this.categoryFilters.push({"name": element.name, "id": element.id})
      });
    })
    this.initialzeForm();
  }

  onClose(){
    this.bsModalRef.hide();
  }

  initialzeForm(){
    this.questionForm=new FormGroup({
      title: new FormControl("", [Validators.required]),
      description:new FormControl("",[Validators.required]),
      categoryId: new FormControl("",[Validators.required])
    })
  }

  onSubmit(){
    this.newQuestion = this.questionForm.value;
      this.questionsService.addQuestion(this.newQuestion).subscribe((data: Question[]) =>{
        this.questionsService.getQuestions(this.currentPage,this.questionlimit).subscribe((data: Question[]) => {
          this.questionsService.updateQuestion(data);
        })
      });      
      this.onClose();
  }
}
