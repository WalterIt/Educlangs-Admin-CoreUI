import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Language } from '../../language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  // baseUrl = "https://usermanagmentpoc.herokuapp.com";
  // corsUrl = "https://cors-anywhere.herokuapp.com/";

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
  /** BUG CROSS DOMAIN
  * Access to XMLHttpRequest at 'http://localhost:8000/api/language' from origin 'http://localhost:4200'
  * has been blocked by CORS policy: Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.
  */
  editLanguage(request) {
  return this.http.put(`${this.baseUrl}/languages`, request);
  }
  /* DELETE LANGUAGE */
  /**
  * BUG DELETING
  * Access to XMLHttpRequest at 'http://localhost:8000/api/language/13' from origin 'http://localhost:4200'
  * has been blocked by CORS policy: Method DELETE is not allowed by Access-Control-Allow-Methods in preflight response.
  */
  deleteLanguage(id) {
  return this.http.delete(`${this.baseUrl}/languages/${id}`);
  }
  getUserDetails(id) {
  return this.http.get(`${this.baseUrl}/get/${id}`);
  }




}
