import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { GrammarTopic } from '../../grammar-topic';

@Injectable({
  providedIn: 'root',
})
export class GrammarTopicService {

  baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getGrammarTopic() {
    return this.http.get<any>(`${this.baseUrl}/grammartopic`)
    .toPromise()
    .then(res => <GrammarTopic[]>res.data)
    .then(data => data);

  }

  addGrammarTopic(request) {
    return this.http.post(`${this.baseUrl}/grammartopic`, request);
  }


  editGrammarTopic(id, request) {
    return this.http.put(`${this.baseUrl}/grammartopic/${id}`, request);  // return this.http.put<Bike>(this.bikesUrl + `/${id}`, bike)
  }

  deleteGrammarTopic(id) {
  return this.http.delete(`${this.baseUrl}/grammartopic/${id}`);
  }
  getUserDetails(id) {
  return this.http.get(`${this.baseUrl}/get/${id}`);
  }

}
