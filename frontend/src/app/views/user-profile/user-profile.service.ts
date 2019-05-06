import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserProfile } from './user-profile';
import { UserAddress } from './user-address';
import { User } from '../../auth/user';

// Setup headers
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


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

  addUserAddress(request) {
    return this.http.post(`${this.baseUrl}/useraddress`, request);
  }


  editUserProfile(id, request) {
    return this.http.put(`${this.baseUrl}/userprofile/${id}`, request);  //  return this.http.put<Bike>(this.bikesUrl + `/${id}`, bike)
  }

  editUserAddress(id, request) {
    return this.http.put(`${this.baseUrl}/useraddress/${id}`, request);  //  return this.http.put<Bike>(this.bikesUrl + `/${id}`, bike)
  }


  editUserEmail(id, request) {
    return this.http.put(`${this.baseUrl}/users/${id}`, request);
  }




  /*

  editUserEmail(id, user: User): Observable<User> {

    const request = JSON.stringify(
      { email: user.email}
    );

    return this.http.put(`${this.baseUrl}/users/${id}`, request, httpOptions)  // ; // ;(this.registerUrl, request, httpOptions)
      .pipe(
        map((response: User) => {

          // Receive jwt token in the response
          // const token: string = response['access_token'];
          // If we have a token, proceed
          /*
          if (token) {
            this.setToken(token);
            this.getUser().subscribe();
          }
          return response;
        }) // , catchError(error => this.handleError(error))
      );
  }
  */






  deleteUserProfile(id) {
  return this.http.delete(`${this.baseUrl}/userprofile/${id}`);
  }

  getUserProfileDetails(id) {
    return this.http.get<any>(`${this.baseUrl}/userprofile/${id}`)
    .toPromise()
    .then(res => <UserProfile[]>res.data)
    .then(data => data);

  }

  getUserProfileDetailsValidation(id) {
    return this.http.get<any>(`${this.baseUrl}/userprofile/${id}`);
    // .toPromise()
    // .then(res => <UserProfile[]>res.data)
    // .then(data => data);

  }

  getUserAddressDetails(id) {
    return this.http.get<any>(`${this.baseUrl}/useraddress/${id}`)
    .toPromise()
    .then(res => <UserAddress[]>res.data)
    .then(data => data);

  }

  getUserDetail(id) {
    return this.http.get<any>(`${this.baseUrl}/users/${id}`)
    .toPromise()
    .then(res => <User[]>res.data)
    .then(data => data);

  }


  /*
  getUserDetails(id) {
  return this.http.get(`${this.baseUrl}/get/${id}`);
  }
  */

}
