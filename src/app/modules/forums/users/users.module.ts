import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './pages/users.component';
import { UserFiltersComponent, UserProfileComponent, UserListComponent } from '.';


@NgModule({
  declarations: [
    UsersComponent,
    UserFiltersComponent,
    UserProfileComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    TooltipModule.forRoot()
  ]
})
export class UsersModule { }
