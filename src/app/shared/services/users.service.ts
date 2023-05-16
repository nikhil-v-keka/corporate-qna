import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  endPoint="users";
  
  constructor(
    private apiService:ApiService
    ) {  }

  getUsers() {
    return this.apiService.getMethod(this.endPoint);
  }

  getUsersId(id:string) {
    return this.apiService.getMethod(`${this.endPoint}?id=${id}`);
  }
}
