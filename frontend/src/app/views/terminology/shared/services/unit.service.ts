import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Unit } from '../../unit';

@Injectable({
  providedIn: 'root',
})
export class UnitService {

  baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getUnit() {
    return this.http.get<any>(`${this.baseUrl}/units`)
    .toPromise()
    .then(res => <Unit[]>res.data)
    .then(data => data);

  }

  addUnit(request) {
    return this.http.post(`${this.baseUrl}/units`, request);
  }


  editUnit(id, request) {
    return this.http.put(`${this.baseUrl}/units/${id}`, request);  // return this.http.put<Bike>(this.bikesUrl + `/${id}`, bike)
  }

  deleteUnit(id) {
  return this.http.delete(`${this.baseUrl}/units/${id}`);
  }
  getUserDetails(id) {
  return this.http.get(`${this.baseUrl}/get/${id}`);
  }

}
