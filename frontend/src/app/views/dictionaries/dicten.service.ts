import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Dicten } from './dicten';


@Injectable({
  providedIn: 'root',
})
export class DictenService {

  baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getDicten() {
    return this.http.get<any>(`${this.baseUrl}/dicten`)
    .toPromise()
    .then(res => <Dicten[]>res)
    .then(data => data);

  }

  addDicten(request) {
    return this.http.post(`${this.baseUrl}/dicten`, request);
  }


  editDicten(id, request) {
    return this.http.put(`${this.baseUrl}/dicten/${id}`, request);  // return this.http.put<Bike>(this.bikesUrl + `/${id}`, bike)
  }

  deleteDicten(id) {
  return this.http.delete(`${this.baseUrl}/dicten/${id}`);
  }
  getUserDetails(id) {
  return this.http.get(`${this.baseUrl}/get/${id}`);
  }

}
