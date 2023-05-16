import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl:string = environment.apiUrl;

  constructor(
    private http:HttpClient,
    ) { }

  getMethod(endpoint:string) {
    return this.http.get(`${this.apiUrl}/${endpoint}`, {headers: {authorization: 'bearer ' + localStorage.getItem('token')}});
  }

  postMethod(endpoint:string, body:any) {
    return this.http.post(`${this.apiUrl}/${endpoint}`, body, {headers: {authorization: 'bearer ' + localStorage.getItem('token')}});
  }

  putMethod(endpoint:string, body:any) {
    return this.http.put(`${this.apiUrl}/${endpoint}`, body, {headers: {authorization: 'bearer ' + localStorage.getItem('token')}});
  }

  patchMethod(endPoint: string, body: any) {
    return this.http.patch(`${this.apiUrl}/${endPoint}`, body, {headers: {authorization: 'bearer ' + localStorage.getItem('token')}});
  }

  loginPostMethod(endpoint: string, loginCredentials) {
    return this.http.post<{ authenticated: boolean }>(`${this.apiUrl}/${endpoint}`, loginCredentials);
  }

  registerPostMethod(endPoint: string, registerDetails) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${this.apiUrl}/${endPoint}`,registerDetails, { headers: headers });
  }

  getLookUpMethod(endPoint: string) {
    return this.http.get(`${this.apiUrl}/lookup/${endPoint}`)
  }

}
