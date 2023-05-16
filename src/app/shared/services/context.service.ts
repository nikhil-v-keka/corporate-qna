import { Injectable } from '@angular/core';

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  claimName: string = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
  claimUserId: string = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';

  constructor() { }

  decodeToken(response) {
    let decodedToken = jwt_decode(response);
    return { loginUserName: decodedToken[this.claimName], loginUserId: decodedToken[this.claimUserId]};
  }

  sessionTime(response) {
    let decodedToken = jwt_decode(response);
    const date = new Date(decodedToken['exp'] * 1000);
    let secondsSinceLogIn: number = Math.floor(date.getTime() / 1000);
    return secondsSinceLogIn;
  }



}
