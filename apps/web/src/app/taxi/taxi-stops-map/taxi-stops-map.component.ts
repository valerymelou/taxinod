import { Component, OnInit } from '@angular/core';
import { TaxiMapService } from '../taxi-map.service';
import { TaxiRoute } from '../taxi-route';
import { TaxiStop } from '../taxi-stop';

@Component({
  selector: 'app-taxi-stops-map',
  templateUrl: './taxi-stops-map.component.html',
  styleUrls: ['./taxi-stops-map.component.scss'],
})
export class TaxiStopsMapComponent implements OnInit {
  mapReady = false;
  options: google.maps.MapOptions = {
    center: { lat: 3.8482805087299705, lng: 11.502045484036042 },
    zoom: 12,
    mapTypeControl: false,
    streetViewControl: false,
    scrollwheel: false
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerOptions: google.maps.MarkerOptions[] = [];
  routes: TaxiRoute[] = [];
  selectedStop!: TaxiStop;

  constructor(private taxiMapService: TaxiMapService) {}

  ngOnInit(): void {
    this.taxiMapService.getMapReady().subscribe((ready: boolean) => {
      this.mapReady = ready;
    });

    this.loadRoutes();
  }

  loadRoutes(): void {
    this.taxiMapService.getRoutes().subscribe((routes: TaxiRoute[]) => {
      this.markerPositions = [];
      this.markerOptions = [];
      this.routes = routes;
      // this.loadMarkers();
    });
  }

  // private loadMarkers(): void {
  //   this.routes.forEach((route: TaxiRoute, index: number) => {
  //     route.stops.forEach((stop: TaxiStop) => {
  //       this.markerPositions.push({lat: stop.latitude, lng: stop.longitude});
  //       this.markerOptions.push(
  //         {
  //           ...this.getMarkerOverrideOptions(index, false),
  //           title: stop.name,
  //           draggable: false,
  //           clickable: true,
  //           collisionBehavior: 'REQUIRED_AND_HIDES_OPTIONAL'
  //         }
  //       );
  //     });
  //   });
  // }

  // private getMarkerOverrideOptions(index: number, active: boolean): google.maps.MarkerOptions {
  //   return {
  //     icon: active ? '/assets/svg/marker-active.svg' : '/assets/svg/marker.svg',
  //     zIndex: active ? 1 : undefined,
  //     label: {
  //       text: (index + 1).toString(),
  //       fontWeight: 'bold',
  //       fontFamily: 'Poppins',
  //       color: active ? '#333' : '#fff'
  //     }
  //   }
  // }
}
