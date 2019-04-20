import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import Country from './country';

@Injectable()
export class CountryService {

    constructor(private http: Http) {
    }

    getCountries(): Observable<Country[]> {
        return this.http.get('/assets/data/countries.json')
            .pipe(map(response => response.json().data as Country[]));
    }
}
