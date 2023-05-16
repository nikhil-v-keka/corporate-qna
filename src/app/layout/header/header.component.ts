import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/authentication/auth.service';
import { ContextService } from 'src/app/shared/services/context.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  currentDate: Date = new Date(Date.now());
  loginUserName: string;
  loginUserId: string;
  imgName = 'keka-logo-light.svg';
  loginUserProfileImage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private contextService: ContextService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.authService.userDetail.subscribe((response) => {
      if (response) {
        let { loginUserName, loginUserId } = this.contextService.decodeToken(response);
        this.loginUserId = loginUserId;
        this.loginUserName = loginUserName;
      }
    });
    if (token) {
      this.getToken();
    }
  }

  getToken() {
    let token = localStorage.getItem('token');
    let { loginUserName, loginUserId } = this.contextService.decodeToken(token);
    this.loginUserId = loginUserId;
    this.loginUserName = loginUserName;
    this.userService.getUsersId(this.loginUserId).subscribe((response) => {
      this.loginUserProfileImage = response[0].profileImageUrl;
      this.authService.setLoginId(response[0].id);
    });
  }

  homePage() {
    this.router.navigate(['/forums']);
  }

  logout() {
    this.authService.logout();
    this.loginUserName = '';
    this.router.navigate(['/login']);
  }
}
