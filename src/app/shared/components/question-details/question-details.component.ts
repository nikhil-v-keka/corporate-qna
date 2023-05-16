import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { AnswerEditorComponent } from '../answer-editor/answer-editor.component';
import { Answer } from '../../models/answer/answer';
import { Question } from '../../models/question/question';
import { SharedAnswerService } from '../../services/shared-answer.service';
import { QuestionsService } from '../../services/questions.service';
import { AnswersService } from '../../services/answers.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
})
export class QuestionDetailsComponent implements OnInit {
  enterAnswer: string = '';
  id: string;
  question: Question;
  answers: Answer[];
  modalRef: BsModalRef;
  sharedData: string;
  hidetextArea: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bsModalService: BsModalService,
    private sharedAnswerService: SharedAnswerService,
    private answerService:AnswersService,
    private questionsService: QuestionsService,
    private sanatizer: DomSanitizer
  ) { }

  updateData(data: string) {
    this.sharedAnswerService.setTextValue(data);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      this.getId();
      this.getQuestion();
    });
    if (this.router.url.includes('users')) {
      this.hidetextArea = false;
    }
    this.sharedAnswerService.getTextValue().subscribe((data) => {
      this.sharedData = data;
    });
  }

  getId() {
    this.route.paramMap.subscribe((data) => {
      this.id = this.route.snapshot.paramMap.get('id');
    });
  }

  getQuestion() {
    this.questionsService.getQuestionByQuestionId(this.id).subscribe((data : Question) => {
      this.question = data[0];
      this.questionsService.questionAskedBy.next(this.question.askedBy);
    });
  }

  expandTextArea() {
    this.modalRef = this.bsModalService.show(AnswerEditorComponent, {
      class: 'large-modal position-absolute bottom-0 right-0 border-radius-10',
    });
  }

  submitAnswer() {
    this.answerService.submitAnswer(this.sharedData, this.id)
    this.sharedData="";
    this.sharedAnswerService.setTextValue('');
  }

  sanatize(html: string): SafeHtml {
    return this.sanatizer.bypassSecurityTrustHtml(html)
  }

  redirectToProfile(event,id: string) {
    event.stopPropagation();
    this.router.navigate([`forums/users/${id}`])
  }

}
