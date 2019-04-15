import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserProfile } from './user-profile';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getUserProfile() {
    return this.http.get<any>(`${this.baseUrl}/userprofile`)
    .toPromise()
    .then(res => <UserProfile[]>res.data)
    .then(data => data);

  }

  addUserProfile(request) {
    return this.http.post(`${this.baseUrl}/userprofile`, request);
  }


  editUserProfile(id, request) {
    return this.http.put(`${this.baseUrl}/userprofile/${id}`, request);  // return this.http.put<Bike>(this.bikesUrl + `/${id}`, bike)
  }

  deleteUserProfile(id) {
  return this.http.delete(`${this.baseUrl}/userprofile/${id}`);
  }
  getUserDetails(id) {
  return this.http.get(`${this.baseUrl}/get/${id}`);
  }

}
