import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';
import { Answer } from '../models/answer/answer';
import { AnswerReaction } from '../models/answer/answer-reaction';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  updateAnswer = new BehaviorSubject<Answer[]>([]);

  constructor(
    private apiService: ApiService
  ) { }

  
  fetchAnswers(id:string){
    this.getAnswer(id).subscribe((data:Answer[]) => {
      this.updateAnswer.next(data)
    })
  }

  getAnswer(id: string) {
    return this.apiService.getMethod(`question/${id}/answers`);
  }

  postAnswer(answer:string,id:string){
    return this.apiService.postMethod(`question/${id}/answers`, {content:answer});
  }

  submitAnswer(data: string, id: string) {
    this.postAnswer(data, id).subscribe((data) => {
      this.fetchAnswers(id);
    });
  }

  putReaction(questionId: string, answerId: string,reaction: AnswerReaction) {
    return this.apiService.putMethod(`question/${questionId}/answers/${answerId}/Reaction`, {reaction:reaction.reaction}).subscribe();
  }
  
  patchBestSolution(questionId: string, answerId: string) {
    return this.apiService.patchMethod(`question/${questionId}/answers/${answerId}/markbestsolution`, {}).subscribe();
  }
}
