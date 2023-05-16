import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnswerComponent } from 'src/app/shared/components/answer/answer.component';
import { QuestionDetailsComponent } from 'src/app/shared/components/question-details/question-details.component';
import { QuestionListComponent } from 'src/app/shared/components/question-list/question-list.component';
import { HomeComponent } from './pages/home.component';
import { SelectQuestionComponent } from 'src/app/shared/components/select-question/select-question.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: QuestionListComponent,
        children: [
        { path: ':id', component: QuestionDetailsComponent, children: [{ path: '', component: AnswerComponent }]},
        {path:'', component:SelectQuestionComponent}
        ],
      },
    ],
  },
  {path: '**', redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
