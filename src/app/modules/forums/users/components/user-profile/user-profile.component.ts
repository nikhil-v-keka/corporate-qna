import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/shared/models/user/user';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {

  id:string;
  user: User;
  constructor(
    private route: ActivatedRoute,
    private userService:UsersService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.getId();
      this.getUserDetails();
    });
  }

  getUserDetails() {
    this.userService.getUsersId(this.id).subscribe((data: User) => {
      this.user = data[0];
    });
  }

  getId() {
    this.id =this.route.snapshot.paramMap.get('id');
  }
}
