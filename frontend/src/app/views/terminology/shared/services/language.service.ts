import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Language } from '../../language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getLanguage() {
    return this.http.get<any>(`${this.baseUrl}/languages`)
    .toPromise()
    .then(res => <Language[]>res.data)
    .then(data => data);

  }

  addLanguage(request) {
    return this.http.post(`${this.baseUrl}/languages`, request);
  }


  editLanguage(id, request) {
    return this.http.put(`${this.baseUrl}/languages/${id}`, request);  // return this.http.put<Bike>(this.bikesUrl + `/${id}`, bike)
  }

  deleteLanguage(id) {
  return this.http.delete(`${this.baseUrl}/languages/${id}`);
  }
  getUserDetails(id) {
  return this.http.get(`${this.baseUrl}/get/${id}`);
  }

}
