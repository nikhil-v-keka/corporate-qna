import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { FileNamePipe } from '../shared/pipes/file-name.pipe';
import { HeaderComponent, LeftNavComponent } from '.';

@NgModule({
  declarations: [
    HeaderComponent,
    LeftNavComponent,
    FileNamePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [
    LeftNavComponent,
    HeaderComponent
  ],
  providers: [FileNamePipe]
})
export class LayoutModule { }
