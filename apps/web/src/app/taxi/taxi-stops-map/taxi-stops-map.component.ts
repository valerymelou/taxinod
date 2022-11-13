import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Path } from '../path';
import { StopInfo } from '../stop-info';
import { TaxiMapService } from '../taxi-map.service';
import { TaxiRoute } from '../taxi-route';
import { TaxiStop } from '../taxi-stop';

@Component({
  selector: 'app-taxi-stops-map',
  templateUrl: './taxi-stops-map.component.html'
})
export class TaxiStopsMapComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  mapReady = false;
  options: google.maps.MapOptions = {
    center: { lat: 3.8482805087299705, lng: 11.502045484036042 },
    zoom: 12,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControlOptions: {
      position: 6
    }
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerOptions: google.maps.MarkerOptions[] = [];
  markersMap: Map<string, TaxiStop> = new Map<string, TaxiStop>();
  stops: TaxiStop[] = [];
  paths: Path[] = [];
  selectedInfo!: StopInfo;
  stopInfo: StopInfo[] = [];

  constructor(private taxiMapService: TaxiMapService) {}

  ngOnInit(): void {
    this.taxiMapService.getMapReady().subscribe((ready: boolean) => {
      this.mapReady = ready;
    });

    this.loadRoutes();
  }

  loadRoutes(): void {
    this.taxiMapService.getPaths().subscribe((paths: Path[]) => {
      this.paths = paths;
      this.loadMarkers();
    });
  }

  mapInitialized(map: google.maps.Map): void {
    this.taxiMapService.setMap(map);
  }

  showInfo(marker: MapMarker, index: number): void {
    this.selectedInfo = this.stopInfo[index];
    this.infoWindow.open(marker);
  }

  private loadMarkers(): void {
    this.markerPositions = [];
    this.markerOptions = [];
    this.stops = [];
    this.markersMap.clear();
    this.taxiMapService.clearRoutes();

    this.paths.forEach((path: Path, pathIndex: number) => {
      path.routes.forEach((route: TaxiRoute, routeIndex: number) => {
        const last = route.destination.id === path.routes[path.routes.length - 1].destination.id;
        if (!this.markersMap.has(route.origin.id)) {
          if (pathIndex === 0 && routeIndex === 0) {
            this.stopInfo.push({
              name: route.origin.name,
              description: `Start here. Propose FCFA${route.std_price} for ${route.destination.name}.`
            });
          }
          this.addMarker(route.origin, false);
        }

        if (!this.markersMap.has(route.destination.id)) {
          if (!last && routeIndex < path.routes.length - 1) {
            this.stopInfo.push({
              name: route.destination.name,
              description: `Stop here. Propose FCFA${path.routes[routeIndex + 1].std_price} for ${path.routes[routeIndex + 1].destination.name}.`
            });
          } else {
            this.stopInfo.push({
              name: route.destination.name,
              description: "This is your destination."
            });
          }
          this.addMarker(route.destination, last);
        }
      });

      this.taxiMapService.calculateRoute(
        this.taxiMapService.calculateRouteParameters(path)
      );
    });
  }

  private getMarkerOverrideOptions(text: string, active: boolean): google.maps.MarkerOptions {
    return {
      // icon: active ? '/assets/svg/marker-active.svg' : '/assets/svg/marker.svg',
      zIndex: active ? 1 : undefined,
      label: {
        text: text,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: active ? '#333' : '#fff'
      }
    }
  }

  private addMarker(stop: TaxiStop, last: boolean = false): void {
    this.markersMap.set(stop.id, stop);
    this.markerPositions.push({lat: stop.latitude, lng: stop.longitude});
    this.stops.push(stop);
    let label = 'S';
    if (this.stops.length === 1) {
      label = 'O';
    } else if (last) {
      label = 'D';
    }
    this.markerOptions.push(
      {
        ...this.getMarkerOverrideOptions(label, false),
        title: stop.name,
        draggable: false,
        clickable: true,
        collisionBehavior: 'REQUIRED_AND_HIDES_OPTIONAL'
      }
    );
  }
}
