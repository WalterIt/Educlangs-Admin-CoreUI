import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { VocabularyTopic } from '../../vocabulary-topic';

@Injectable({
  providedIn: 'root',
})
export class VocabularyTopicService {

  baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getVocabularyTopic() {
    return this.http.get<any>(`${this.baseUrl}/vocabularytopic`)
    .toPromise()
    .then(res => <VocabularyTopic[]>res.data)
    .then(data => data);

  }

  addVocabularyTopic(request) {
    return this.http.post(`${this.baseUrl}/vocabularytopic`, request);
  }


  editVocabularyTopic(id, request) {
    return this.http.put(`${this.baseUrl}/vocabularytopic/${id}`, request);  // return this.http.put<Bike>(this.bikesUrl + `/${id}`, bike)
  }

  deleteVocabularyTopic(id) {
  return this.http.delete(`${this.baseUrl}/vocabularytopic/${id}`);
  }
  getUserDetails(id) {
  return this.http.get(`${this.baseUrl}/get/${id}`);
  }

}
