import { Component, Input, OnInit } from '@angular/core';

import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  @Input() searchValue: string = '';

  userList: User[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.userList = data;
    });
  }

  findSearchElement(data: any) {
    this.searchValue = data.toLowerCase();
  }

  matchSearchValue(user: User) {
    return (
      this.searchValue === '' ||
      user.name.toLowerCase().includes(this.searchValue) ||
      user.designation.toLowerCase().includes(this.searchValue) ||
      user.department.toLowerCase().includes(this.searchValue) ||
      user.location.toLowerCase().includes(this.searchValue)
    );
  }
}
