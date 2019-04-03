import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService { 

baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<any>(`${this.baseUrl}/users`)
    .toPromise()
    .then(res => <User[]>res.data)
    .then(data => data);

  }

  addUser(request) {
    return this.http.post(`${this.baseUrl}/users`, request);
  }


  editUser(id, request) {
    return this.http.put(`${this.baseUrl}/users/${id}`, request);  // return this.http.put<Bike>(this.bikesUrl + `/${id}`, bike) 
  }

  deleteUser(id) {
  return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  getUserDetails(id) {
    return this.http.get(`${this.baseUrl}/get/${id}`);
  }


}
