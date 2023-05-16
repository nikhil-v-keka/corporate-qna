import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ToastrModule } from 'ngx-toastr';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './pages/core.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SessionTimeoutComponent } from './components/session-timeout/session-timeout.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    CoreComponent,
    UserLoginComponent,
    LoaderComponent,
    SessionTimeoutComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut:3000,
      closeButton: true,
      progressBar: true,
      titleClass: 'true',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  exports: [
    LoaderComponent
  ]
})
export class CoreModule { }
