import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { TaxiStop } from '../taxi-stop';

const CURRENT_PLACEHOLDER: TaxiStop = {
  id: 'current',
  name: 'Current location',
  longitude: 0,
  latitude: 0
};

@Component({
  selector: 'app-taxi-route-search',
  templateUrl: './taxi-route-search.component.html'
})
export class TaxiRouteSearchComponent {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  form = new FormGroup({
    from: new FormControl<TaxiStop|null>(null),
    to: new FormControl<TaxiStop|null>(null),
    mode: new FormControl<'car'|'moto'|'any'>('car')
  });

  fromStops$: Observable<TaxiStop[]> = of([CURRENT_PLACEHOLDER]);
  toStops$: Observable<TaxiStop[]> = of([
    {
      id: '2',
      name: 'Carrefour Mbog Abang',
      longitude: 1,
      latitude: 2
    }
  ]);

  active = false;
  hasResults = false;

  displayMode: 'list'|'map' = 'list';

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 640px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  displayFn(stop: TaxiStop): string {
    return stop?.name;
  }

  activate(): void {
    this.active = true;
  }

  deactivate(): void {
    this.active = false;
    this.hasResults = false;
    this.form.get('from')?.setValue(null);
    this.form.get('to')?.setValue(null);
  }

  onSubmit(): void {
    this.hasResults = true;
  }

  setMode(mode: 'car'|'moto'|'any'): void {
    if (mode !== this.form.get('mode')?.value) {
      this.form.get('mode')?.setValue(mode);
      this.onSubmit();
    }
  }

  setDisplayMode(mode: 'list'|'map'): void {
    this.displayMode = mode;
  }

  clearField(field: string, event: MouseEvent): void {
    event.stopPropagation();
    this.form.get(field)?.setValue(null);
  }
}
