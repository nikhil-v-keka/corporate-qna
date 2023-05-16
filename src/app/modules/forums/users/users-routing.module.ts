import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './pages/users.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { QuestionListComponent } from 'src/app/shared/components/question-list/question-list.component';
import { SelectQuestionComponent } from 'src/app/shared/components/select-question/select-question.component';
import { QuestionDetailsComponent } from 'src/app/shared/components/question-details/question-details.component';
import { AnswerComponent } from 'src/app/shared/components/answer/answer.component';

const routes: Routes = [
  { path: '', component: UsersComponent,
    children: [
      { path: '', component: UserListComponent },
      { path: ':id', component: UserProfileComponent,
        children: [
          { path: '', redirectTo: 'questions', pathMatch: 'full' },
          { path: 'questions', component: QuestionListComponent,
            children: [
            { path: ':id', component: QuestionDetailsComponent, children: [{ path: '', component: AnswerComponent }]},
            { path:'', component:SelectQuestionComponent }],
          },
          { path: 'answers', component: QuestionListComponent,
            children: [
              { path: ':id', component: QuestionDetailsComponent, children: [{ path: '', component: AnswerComponent }]},
              { path: '', component: SelectQuestionComponent }],},
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
