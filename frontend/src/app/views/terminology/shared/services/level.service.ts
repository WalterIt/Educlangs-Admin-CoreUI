import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Level } from '../../level';

@Injectable({
  providedIn: 'root',
})
export class LevelService {

  baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getLevel() {
    return this.http.get<any>(`${this.baseUrl}/levels`)
    .toPromise()
    .then(res => <Level[]>res.data)
    .then(data => data);

  }

  addLevel(request) {
    return this.http.post(`${this.baseUrl}/levels`, request);
  }


  editLevel(id, request) {
    return this.http.put(`${this.baseUrl}/levels/${id}`, request);  // return this.http.put<Bike>(this.bikesUrl + `/${id}`, bike)
  }

  deleteLevel(id) {
  return this.http.delete(`${this.baseUrl}/levels/${id}`);
  }
  getUserDetails(id) {
  return this.http.get(`${this.baseUrl}/get/${id}`);
  }

}
