import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { AnswersService } from '../../services/answers.service';
import { Answer } from '../../models/answer/answer';
import { LikeStatus } from '../../enums/like.enum';
import { AnswerReaction } from '../../models/answer/answer-reaction';
import { SharedAnswerService } from '../../services/shared-answer.service';
import { QuestionsService } from '../../services/questions.service';
import { ContextService } from '../../services/context.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
})
export class AnswerComponent implements OnInit {
  @ViewChildren('checked') checked?: QueryList<ElementRef>;
  id: string;
  questionAskedBy: string;
  token: string = 'token'; 
  isMarked: boolean = false;
  reaction: AnswerReaction;
  answers: Answer[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private answerService: AnswersService,
    private sanatizer: DomSanitizer,
    private sharedService: SharedAnswerService,
    private questionsService: QuestionsService,
    private contextService: ContextService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.getId();
      this.answerService.fetchAnswers(this.id);
      this.getAnswers();
    });
  }

  getId() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  getAnswers() {
    this.answerService.updateAnswer.subscribe((data) => {
      this.answers = data;
      this.markedAsBestSolution();
    });
  }

  likeDislikeReaction(i: number, newReaction: LikeStatus) {
    this.sharedService.updateReaction(this.answers[i], newReaction);
    this.setAnswerReaction(i);
  }
  
  onLike(i: number) {
    this.likeDislikeReaction(i, LikeStatus.Like);
  }
  
  onDisLike(i: number) {
    this.likeDislikeReaction(i, LikeStatus.DisLike);
  }

  setAnswerReaction(i: number) {
     this.reaction = new AnswerReaction(this.answers[i].reaction);
     this.answerService.putReaction(this.id, this.answers[i].id, this.reaction);
  }

  updateCheckedOptions(option: Answer, event: Event) {
    const target = event.target as HTMLInputElement;
    const checkboxList = this.checked.toArray();
    this.answers.forEach((item) => {
      if (item.id != option.id) {
        item.isBestSolution = false;
      } else {
        item.isBestSolution = true;
      }
    });
    this.questionsService.updateMarksAsBestSolution(this.id);
    this.answerService.patchBestSolution(this.id, option.id);
  }

  markedAsBestSolution() {
    const token = localStorage.getItem(this.token);
    const { loginUserId } = this.contextService.decodeToken(token);
    this.questionsService.questionAskedBy.subscribe((response) => {
      this.questionAskedBy = response;
      if(loginUserId === this.questionAskedBy) {
        this.isMarked = true;
      } else {
        this.isMarked = false;
      }
    });
  }

  sanatize(html: string): SafeHtml {
    return this.sanatizer.bypassSecurityTrustHtml(html);
  }

  redirectToUser(event,id: string) {
    event.stopPropagation();
    this.router.navigate([`forums/users/${id}`]);
  }
}
