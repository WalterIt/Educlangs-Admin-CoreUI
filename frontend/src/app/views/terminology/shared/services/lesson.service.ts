import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Lesson } from '../../lesson';

@Injectable({
  providedIn: 'root',
})
export class LessonService {

  baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getLesson() {
    return this.http.get<any>(`${this.baseUrl}/lessons`)
    .toPromise()
    .then(res => <Lesson[]>res.data)
    .then(data => data);

  }

  addLesson(request) {
    return this.http.post(`${this.baseUrl}/lessons`, request);
  }


  editLesson(id, request) {
    return this.http.put(`${this.baseUrl}/lessons/${id}`, request);  // return this.http.put<Bike>(this.bikesUrl + `/${id}`, bike)
  }

  deleteLesson(id) {
  return this.http.delete(`${this.baseUrl}/lessons/${id}`);
  }
  getUserDetails(id) {
  return this.http.get(`${this.baseUrl}/get/${id}`);
  }

}
