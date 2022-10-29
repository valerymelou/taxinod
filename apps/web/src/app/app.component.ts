import { Component, OnInit } from '@angular/core';
import { TaxiMapService } from './taxi/taxi-map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private taxiMapService: TaxiMapService) {}

  ngOnInit(): void {
    this.taxiMapService.initializeMap();
  }
}
