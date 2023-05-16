import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Subscription, switchMap } from 'rxjs';

import { VoteStatus } from '../../enums/vote.enums';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { Question } from '../../models/question/question';
import { QuestionReaction } from '../../models/question/question-reaction';
import { QuestionsService } from '../../services/questions.service';
import { HomeService } from '../../services/home.service';
import { SharedAnswerService } from '../../services/shared-answer.service';
import { HomeFilter } from '../../models/filters/homeFIlter';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
})
export class QuestionListComponent implements OnInit, OnDestroy {
  userId?: string;
  searchValue: string = '';
  loginUserId: string;
  // filter: string[];
  currentUrl: string;
  currentUrlSection: string;
  newPage: number;
  currentPage: number = 1;
  questionlimit: number = 10;
  istoggled: boolean = false;
  isLoadMore: boolean = true;
  reaction: QuestionReaction;
  questionsList: Question[] = [];
  defaultList: Question[] = [];
  filter: HomeFilter;
  filteredData : Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionsService,
    private sanitizer: DomSanitizer,
    private homeService: HomeService,
    private authService: AuthService,
    private sharedService: SharedAnswerService
  ) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.currentUrlSection = this.route.snapshot.url.join('/');
    this.route.parent.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });
    this.questionService.searchQuerySource.subscribe((data: string) => {
      this.searchValue = data.toLowerCase();
    });
    this.authService.getloginId().subscribe((response) => {
      this.loginUserId = response;
    });
    this.getQuestionsList();
  }

  getQuestionsList() {
    if (this.currentUrl.includes(`forums/users/${this.userId}`)) {
      if (this.currentUrlSection === 'questions') {
        this.questionService
          .getQuestionByUserId(
            this.userId,
            this.currentPage,
            this.questionlimit
          )
          .subscribe((data: Question[]) => {
            this.questionsList = this.sortaskedOn(data, 'askedOn');
            this.checkResponseCount(data.length);
          });
      } else if (this.currentUrlSection === 'answers') {
        this.questionService
          .getAnsweredQuestionByUserId(
            this.userId,
            this.currentPage,
            this.questionlimit
          )
          .subscribe((data: Question[]) => {
            this.questionsList = this.sortaskedOn(data, 'askedOn');
            this.checkResponseCount(data.length);
          });
      }
    } else {
      this.filteredData = this.homeService.homeFilters
        .pipe(
          switchMap((filter) => {
            this.currentPage = 1;
            return this.questionService.getQuestionByFilter(
              filter.categoryId,
              filter.showFilter,
              filter.sortFilter,
              this.currentPage,
              this.questionlimit
            );
          })
        )
        .subscribe((response: Question[]) => {
          this.questionsList = response;
          this.questionService.updateQuestion(this.questionsList);
          this.checkResponseCount(response.length);
        });
      this.questionService.updateSubject.subscribe((data) => {
        this.questionsList = this.sortaskedOn(data, 'askedOn');
      });
    }
  }

  vote(i: number, event: Event, type: VoteStatus) {
    event.stopPropagation();
    this.sharedService.updateReaction(this.questionsList[i], type);
    this.setQuestionReaction(i);
  }

  upVote(i: number, event: Event) {
    this.vote(i, event, VoteStatus.Upvote);
  }

  downVote(i: number, event: Event) {
    this.vote(i, event, VoteStatus.Downvote);
  }

  setQuestionReaction(i: number) {
    this.reaction = new QuestionReaction(this.questionsList[i].reaction);
    this.questionService.putReaction(this.questionsList[i].id, this.reaction);
  }

  countViews(index: number) {
    if (!this.istoggled) {
      this.questionsList[index].viewsCount++;
      this.istoggled = true;
    } else {
      this.istoggled = false;
    }
  }

  loadMoreQuestion() {
    this.newPage = ++this.currentPage;

    if (this.currentUrl.includes(`forums/users/${this.userId}`)) {
      if (this.currentUrlSection === 'questions') {
        this.questionService
          .getQuestionByUserId(this.userId, this.newPage, this.questionlimit)
          .subscribe((data: Question[]) => {
            this.checkResponseCount(data.length);
            this.questionsList.push(...data);
            this.questionService.updateQuestion(this.questionsList);
            this.questionService.updateSubject.subscribe((data) => {
              this.questionsList = this.sortaskedOn(data, 'askedOn');
            });
          });
      } else if (this.currentUrlSection === 'answers') {
        this.questionService
          .getAnsweredQuestionByUserId(
            this.userId,
            this.newPage,
            this.questionlimit
          )
          .subscribe((data: Question[]) => {
            this.checkResponseCount(data.length);
            this.questionsList.push(...data);
            this.questionService.updateQuestion(this.questionsList);
            this.questionService.updateSubject.subscribe((data) => {
              this.questionsList = this.sortaskedOn(data, 'askedOn');
            });
          });
      }
    } else {
      this.homeService.homeFilters.subscribe((response) => {
        this.filter = response;
      });
      this.questionService
        .getQuestionByFilter(
          this.filter.categoryId,
          this.filter.showFilter,
          this.filter.sortFilter,
          this.newPage,
          this.questionlimit
        )
        .subscribe((response: Question[]) => {
          this.questionsList.push(...response);
          this.questionService.updateQuestion(this.questionsList);
          this.checkResponseCount(response.length);
        });
    }
  }

  checkResponseCount(count: number) {
    if (count < this.questionlimit) {
      this.isLoadMore = false;
    } else {
      this.isLoadMore = true;
    }
  }

  matchSearchValue(data: Question) {
    return (
      this.searchValue == '' ||
      data.title.toLowerCase().includes(this.searchValue) ||
      data.description.toLowerCase().includes(this.searchValue)
    );
  }

  sortaskedOn(data: Question[], property: string) {
    this.questionsList = data.sort((a, b) => {
      const timeA = new Date(a[property]).getTime();
      const timeB = new Date(b[property]).getTime();
      return timeB - timeA;
    });
    return this.questionsList;
  }

  sanatize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  redirectToUser(event, id: string) {
    event.stopPropagation();
    this.router.navigate([`/forums/users/${id}`]);
  }

  ngOnDestroy(): void {
    if (this.currentUrl.includes('home')) this.filteredData.unsubscribe();  
    this.homeService.homeFilters.next({
      categoryId: 'all',
      showFilter: 'all',
      sortFilter: 'all',
    });
  }
}
