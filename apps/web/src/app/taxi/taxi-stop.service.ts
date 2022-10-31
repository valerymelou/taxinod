import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Results } from './results';
import { TaxiStop } from './taxi-stop';

@Injectable({
  providedIn: 'root'
})
export class TaxiStopService {
  private url = '/stops/';

  constructor(private http: HttpClient) {}

  getList(query: string): Observable<Results<TaxiStop>> {
    const params = new HttpParams({fromObject: {search: query}});

    return this.http.get<Results<TaxiStop>>(this.url, {params});
  }
}
