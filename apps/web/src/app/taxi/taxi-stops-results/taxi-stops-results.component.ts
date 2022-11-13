import { Component, Input } from '@angular/core';
import { Path } from '../path';
import { TaxiMapService } from '../taxi-map.service';
import { TaxiRoute } from '../taxi-route';

@Component({
  selector: 'app-taxi-stops-results',
  templateUrl: './taxi-stops-results.component.html'
})
export class TaxiStopsResultsComponent {
  @Input()
  set paths(paths: Path[]|null) {
    if (paths) {
      this._paths = paths;
      this.taxiMapService.update(paths);
    }
  }

  get paths(): Path[] {
    return this._paths;
  }

  private _paths: Path[] = [];

  constructor(private taxiMapService: TaxiMapService) {}

  totalCost(path: Path): number {
    return path.routes.reduce((acc: number, route: TaxiRoute) => {
      return acc + route.std_price;
    }, 0);
  }
}
