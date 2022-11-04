import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Path } from './path';

@Injectable({
  providedIn: 'root'
})
export class TaxiSearchService {
  private url = '/search/';

  constructor(private http: HttpClient) { }

  search(filters: {[key: string]: string|number}): Observable<Path[]> {
    const params = new HttpParams({fromObject: filters});

    return this.http.get<Path[]>(this.url, {params});
  }
}
