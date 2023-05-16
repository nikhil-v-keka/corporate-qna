import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtHelperService } from '@auth0/angular-jwt';
import { QuillConfigModule, QuillModule } from 'ngx-quill';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';
import { TimeAgoPipe } from './shared/pipes/time-ago.pipe';
import { AnswerComponent } from './shared/components/answer/answer.component';
import { QuestionListComponent } from './shared/components/question-list/question-list.component';
import { QuestionDetailsComponent } from './shared/components/question-details/question-details.component';
import { AnswerEditorComponent } from './shared/components/answer-editor/answer-editor.component';
import { SelectQuestionComponent } from './shared/components/select-question/select-question.component';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    QuestionListComponent,
    QuestionDetailsComponent,
    AnswerComponent,
    AnswerEditorComponent,
    SelectQuestionComponent,
    TimeAgoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NgHttpLoaderModule.forRoot(),
    QuillModule.forRoot(),
    QuillConfigModule.forRoot({
      modules: {
        toolbar: []
      }
    }),
  ],
  providers: [JwtHelperService,
    { provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
