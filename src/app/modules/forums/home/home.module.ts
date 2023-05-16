import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './pages/home.component';
import { AddQuestionComponent, HomeActionsComponent } from '.';
import { QuillConfigModule, QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    HomeComponent,
    HomeActionsComponent,
    AddQuestionComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    QuillModule.forRoot(),
    QuillConfigModule.forRoot({
      modules: {
        toolbar: []
      }
    })
  ],
  providers:[
    BrowserAnimationsModule,
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
