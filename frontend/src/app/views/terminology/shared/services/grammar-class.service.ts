import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { GrammarClass } from '../../grammarClass';

@Injectable({
  providedIn: 'root',
})
export class GrammarClassService {

  baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getGrammarClass() {
    return this.http.get<any>(`${this.baseUrl}/grammarclass`)
    .toPromise()
    .then(res => <GrammarClass[]>res.data)
    .then(data => data);

  }

  addGrammarClass(request) {
    return this.http.post(`${this.baseUrl}/grammarclass`, request);
  }


  editGrammarClass(id, request) {
    return this.http.put(`${this.baseUrl}/grammarclass/${id}`, request);  // return this.http.put<Bike>(this.bikesUrl + `/${id}`, bike)
  }

  deleteGrammarClass(id) {
  return this.http.delete(`${this.baseUrl}/grammarclass/${id}`);
  }
  getUserDetails(id) {
  return this.http.get(`${this.baseUrl}/get/${id}`);
  }

}
