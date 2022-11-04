import { Component, Input } from '@angular/core';
import { Path } from '../path';
import { TaxiRoute } from '../taxi-route';

@Component({
  selector: 'app-taxi-stops-results',
  templateUrl: './taxi-stops-results.component.html'
})
export class TaxiStopsResultsComponent {
  @Input() paths: Path[] = [];

  totalCost(path: Path): number {
    return path.routes.reduce((acc: number, route: TaxiRoute) => {
      return acc + route.std_price;
    }, 0);
  }
}
