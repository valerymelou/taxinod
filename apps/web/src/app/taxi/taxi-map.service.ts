import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, Subject } from 'rxjs';
import { Path } from './path';
import { RouteParams } from './route-params';
import { TaxiRoute } from './taxi-route';
import { TaxiStop } from './taxi-stop';

@Injectable({
  providedIn: 'root'
})
export class TaxiMapService {
  private paths$: Subject<Path[]> = new Subject<Path[]>();
  private mapReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private map!: google.maps.Map;
  private directionsService!: google.maps.DirectionsService;
  private directionsRenderer!: google.maps.DirectionsRenderer;

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

  getPaths(): Subject<Path[]> {
    return this.paths$;
  }

  update(paths: Path[]): void {
    this.paths$.next(paths);
  }

  setMap(map: google.maps.Map): void {
    this.map = map;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
    this.directionsRenderer.setMap(map);
  }

  calculateRouteParameters(path: Path): RouteParams {
    const origin = path.routes[0].origin;
    const destination = path.routes[path.routes.length - 1].destination;
    const stops: Set<TaxiStop> = new Set<TaxiStop>();

    path.routes.forEach((route: TaxiRoute) => {
      if (route.origin.id !== origin.id && route.origin.id !== destination.id) {
        stops.add(route.origin)
      }

      if (route.destination.id !== origin.id && route.destination.id !== destination.id) {
        stops.add(route.destination)
      }
    });

    const params: RouteParams = {
      origin: new google.maps.LatLng(origin.latitude, origin.longitude),
      destination: new google.maps.LatLng(destination.latitude, destination.longitude),
      waypoints: []
    };

    stops.forEach((stop: TaxiStop) => {
      params.waypoints.push({
        location: new google.maps.LatLng(stop.latitude, stop.longitude),
        stopover: true
      });
    });

    return params;
  }

  calculateRoute(params: RouteParams): void {
    this.directionsService.route({
      ...params,
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true
    }).then((response: google.maps.DirectionsResult) => {
      this.directionsRenderer.setDirections(response);
    });
  }
}
