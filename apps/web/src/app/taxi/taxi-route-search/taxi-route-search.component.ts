import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, finalize, map, Observable, of, Subject, switchMap } from 'rxjs';
import { Path } from '../path';
import { Results } from '../results';
import { TaxiSearchService } from '../taxi-search.service';
import { TaxiStop } from '../taxi-stop';
import { TaxiStopService } from '../taxi-stop.service';

const MODES: {[key: string]: number} = {
  'car': 1,
  'moto': 2
};

@Component({
  selector: 'app-taxi-route-search',
  templateUrl: './taxi-route-search.component.html'
})
export class TaxiRouteSearchComponent implements OnInit {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  form = new FormGroup({
    from: new FormControl<TaxiStop|null>(null),
    to: new FormControl<TaxiStop|null>(null),
    mode: new FormControl<'car'|'moto'|'any'>('car')
  });

  fromStops$: Observable<TaxiStop[]> = of([]);
  toStops$: Observable<TaxiStop[]> = of([]);
  defaultStop: TaxiStop = {
    id: 'current',
    name: 'Current location',
    longitude: 0,
    latitude: 0
  };

  active = false;
  hasResults = false;
  loading = false;

  displayMode: 'list'|'map' = 'list';

  searchFrom$ = new Subject<string>();
  searchTo$ = new Subject<string>();
  paths$!: Observable<Path[]>;

  loadingFromStops = false;
  loadingToStops = false;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private taxiStopService: TaxiStopService,
    private taxiSearchService: TaxiSearchService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 640px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.watchFromOptions();
    this.watchToOptions();
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
    this.search();
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

  searchFromOptions(query: string): void {
    this.searchFrom$.next(query);
  }

  searchToOptions(query: string): void {
    this.searchTo$.next(query);
  }

  private watchFromOptions(): void {
    this.fromStops$ = this.searchFrom$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((query: string) => {
        this.loadingFromStops = true;
        return this.taxiStopService.getList(query).pipe(
          finalize(() => this.loadingFromStops = false),
          map((response: Results<TaxiStop>) => {
            return response.results;
          })
        );
      })
    );
  }

  private watchToOptions(): void {
    this.toStops$ = this.searchTo$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((query: string) => {
        this.loadingToStops = true;
        return this.taxiStopService.getList(query).pipe(
          finalize(() => this.loadingToStops = false),
          map((response: Results<TaxiStop>) => {
            return response.results;
          })
        );
      })
    );
  }

  private search(): void {
    const filters: {[key: string]: string|number} = {
      from: this.form.value.from?.id ? this.form.value.from?.id : '',
      to: this.form.value.to?.id ? this.form.value.to?.id : '',
    }

    if (this.form.value.mode && this.form.value.mode !== 'any') {
      filters['mode'] = MODES[this.form.value.mode];
    }


    this.loading = true;
    this.paths$ = this.taxiSearchService.search(filters).pipe(
      finalize(() => this.loading = false)
    );
  }
}
