import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';

import { ApiService } from 'src/app/shared/services/api.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userDetail = new BehaviorSubject<string>('');
  loginId = new BehaviorSubject<string>('');
  private Authenticated = false;

  constructor(
    private http: HttpClient, 
    private apiService: ApiService,
    ) {}

  login(loginDetails): Observable<any> {
    // const userName = loginDetails.userName;
    // const password = loginDetails.password;
    // after encryption
    const userName = loginDetails.encryptedUsername;
    const password = loginDetails.encryptedPassword;
    
    const loginCredentials = { userName, password };
    return this.apiService
      .loginPostMethod(`authorization/login`, loginCredentials)
      .pipe(
        tap(() => {
          this.Authenticated = true;
        })
      );
  }

  signUp(signUpValues): Observable<any>{
    return this.apiService.registerPostMethod('authorization/register',signUpValues);
  }

  UploadImage(formData : FormData) {
    return this,this.apiService.registerPostMethod('authorization/uploadImage',formData);
  }

  logout(): void {
    localStorage.removeItem('token')
    this.Authenticated = false;
  }

  isAuthenticated(): boolean {
    const token: string = localStorage.getItem('token');
    if(token) {
      this.Authenticated = true;
    }
    return this.Authenticated && (token !== null && token !== undefined);
  }

  setLoginId(value) {    
    this.loginId.next(value);
  }

  getloginId() {
    return this.loginId.asObservable();
  }

  getDepartment() {
    return this.apiService.getLookUpMethod('departments');
  }

  getDesignation() {
    return this.apiService.getLookUpMethod('designations');
  }

}
