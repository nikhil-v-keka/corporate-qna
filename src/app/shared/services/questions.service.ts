import { Injectable } from '@angular/core';

import { BehaviorSubject, filter } from 'rxjs';

import { ApiService } from './api.service';
import { Question } from '../models/question/question';
import { QuestionReaction } from '../models/question/question-reaction';
import { NewQuestion } from '../models/question/add-question';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { Filters } from '../models/filters/filters';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  endPoint: string = 'questions';
  searchValue: string = '';
  loginUserId: string;
  searchQuerySource = new BehaviorSubject<string>('');
  updateSubject = new BehaviorSubject<Question[]>([]);
  questionAskedBy = new BehaviorSubject<string>('');

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  updateQuestion(value: Question[]) {
    this.updateSubject.next(value);
  }

  updateSearchValue(value: string) {
    this.searchQuerySource.next(value);
  }

  getQuestions(currentPage: number, questionLimit: number) {
    return this.apiService.getMethod(`${this.endPoint}?pageNumber=${currentPage}&limit=${questionLimit}`);
  }

  getQuestionByUserId(userId: string, currentPage: number, questionLimit: number) {
    return this.apiService.getMethod(`${this.endPoint}?userId=${userId}&pageNumber=${currentPage}&limit=${questionLimit}`);
  }

  getAnsweredQuestionByUserId(userId: string, currentPage: number, questionLimit: number) {
    return this.apiService.getMethod(`${this.endPoint}/users/${userId}/questionsanswered?pageNumber=${currentPage}&limit=${questionLimit}`);
  }

  getQuestionByQuestionId(id: string) {
    return this.apiService.getMethod(`${this.endPoint}?questionId=${id}`);
  }

  getQuestionByCategoryId(categoryId: string, currentPage: number, questionLimit: number ) {
    return this.apiService.getMethod(`${this.endPoint}?categoryId=${categoryId}&pageNumber=${currentPage}&limit=${questionLimit}`);
  }

  addQuestion(question: NewQuestion) {
    return this.apiService.postMethod(this.endPoint, question);
  }

  putReaction(questionId: string, reaction: QuestionReaction) {
    return this.apiService.putMethod(`questions/${questionId}/Reaction`, {reaction: reaction.reaction}).subscribe();
  }
  
  getLoginUserId() {
    this.authService.getloginId().subscribe((response) => {this.loginUserId = response;});
  }

  updateMarksAsBestSolution(id: string) {
    let data = this.updateSubject.value;
    let index = data.findIndex((obj) => obj.id == id);
    data[index].isResolved = !data[index].isResolved;
    this.updateSubject.next(data);
  }

  objectToQueryString(filters: Filters){
     const params = new URLSearchParams(); 
     for (const [key, value] of Object.entries(filters)) { 
       if (value !== undefined && value !== null && typeof value !== 'object' && !Array.isArray(value)) { 
          params.append(key, value.toString());
        } 
    }
     return params.toString(); 
  }

  getQuestionByFilter(category: string, showFilter: string, sortedBy: string, pageNumber: number, questionLimit: number) {
    let newUrl = '';
    let filters = new  Filters([]);

    filters.categoryId = (category != 'all') ? category : null;
    this.getLoginUserId();
    switch(showFilter) {
      case 'My Questions' : filters.userId = this.loginUserId; break;
      case 'My Participation' : filters.userId= this.loginUserId; filters.isMyParticipation = true; break;
      case 'Solved' : filters.isResolved = true; break;
      case 'Unsolved' : filters.isResolved = false; break;
      case 'Hot' : filters.isMostViewed = true ; break;
      default : {
        filters.isMostViewed = null;
        filters.isResolved = null;
        filters.userId = null;
      }
    }

    switch(sortedBy){
      case 'Recent' : filters.days = 7; break;
      case 'Last 10 days' : filters.days = 10 ; break;
      case 'Last 30 days' : filters.days = 30 ; break;
      default : filters.days = null;
    }

    newUrl = this.objectToQueryString(filters);
    return this.apiService.getMethod(`${this.endPoint}?${newUrl}&pageNumber=${pageNumber}&limit=${questionLimit}`)
  }
}
