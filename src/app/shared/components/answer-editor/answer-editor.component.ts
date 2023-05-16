import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { SharedAnswerService } from '../../services/shared-answer.service';
import { AnswersService } from '../../services/answers.service';

@Component({
  selector: 'app-answer-editor',
  templateUrl: './answer-editor.component.html',
})
export class AnswerEditorComponent implements OnInit {
  sharedData: string;
  id: string;

  constructor(
    private bsModalRef: BsModalRef,
    private router: Router,
    private sharedAnswerService: SharedAnswerService,
    private answerService: AnswersService
  ) {  }

  ngOnInit(): void {
    this.sharedAnswerService.getTextValue().subscribe((data) => {
      this.sharedData = data;
    });
  }

  compressEditor() {
    this.bsModalRef.hide();
  }

  updateData(data: string) {
    this.sharedAnswerService.setTextValue(data);
  }

  submit(){
    this.id = this.router.url.split('/').pop();
    this.answerService.submitAnswer(this.sharedData,this.id);
    this.compressEditor();
    this.sharedAnswerService.setTextValue('');
  }
}
