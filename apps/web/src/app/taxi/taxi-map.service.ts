import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { TaxiRoute } from './taxi-route';

@Injectable({
  providedIn: 'root'
})
export class TaxiMapService {
  private routes$: BehaviorSubject<TaxiRoute[]> = new BehaviorSubject<TaxiRoute[]>([]);
  private mapReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  initializeMap(): void {
    this.http
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${process.env['NX_GOOGLE_MAPS_API_KEY']}`,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      ).subscribe((ready: boolean) => {
        this.mapReady$.next(ready);
      });
  }

  getMapReady(): BehaviorSubject<boolean> {
    return this.mapReady$;
  }

  getRoutes(): BehaviorSubject<TaxiRoute[]> {
    return this.routes$;
  }

  update(routes: TaxiRoute[]): void {
    this.routes$.next(routes);
  }
}
