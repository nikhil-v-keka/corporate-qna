import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { ForumsRoutingModule } from './forums-routing.module';
import { ForumsComponent } from './pages/forums.component';
import { HomeModule } from './home/home.module';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
    ForumsComponent
  ],
  imports: [
    CommonModule,
    ForumsRoutingModule,
    RouterModule,
    HomeModule,
    LayoutModule
  ],
  exports:[
    ForumsComponent
  ]
})
export class ForumsModule { }
