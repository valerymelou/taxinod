import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { Results } from '../results';
import { TaxiStop } from '../taxi-stop';
import { TaxiStopService } from '../taxi-stop.service';

import { TaxiRouteSearchComponent } from './taxi-route-search.component';

@Component({
  selector: 'app-taxi-stops-results',
  template: 'app taxi stops results works'
})
class TaxiStopsResultsStubComponent {}

describe('TaxiRouteSearchComponent', () => {
  let component: TaxiRouteSearchComponent;
  let fixture: ComponentFixture<TaxiRouteSearchComponent>;
  let taxiStopServiceSpy: jasmine.SpyObj<TaxiStopService>;
  const stops: Results<TaxiStop> = {
    count: 1,
    next: null,
    previous: null,
    results: [
      {
        id: '1',
        name: 'Neptune',
        latitude: 1,
        longitude: 2
      }
    ]
  };

  beforeEach(async () => {
    const taxiStopServiceMock = jasmine.createSpyObj('TaxiStopService', ['getList']);

    await TestBed.configureTestingModule({
      declarations: [TaxiRouteSearchComponent, TaxiStopsResultsStubComponent],
      imports: [
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        SharedModule,
      ],
      providers: [
        { provide: TaxiStopService, useValue: taxiStopServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaxiRouteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    taxiStopServiceSpy = TestBed.inject(TaxiStopService) as jasmine.SpyObj<TaxiStopService>;
    taxiStopServiceSpy.getList.and.returnValue(of(stops));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.mobileQuery.dispatchEvent(new Event('change'));
  });

  it('should activate the search form', () => {
    const inputEl = fixture.debugElement.query(By.css('input'));
    inputEl.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.active).toBeTrue();
  });

  it('should deactivate the search form', () => {
    const inputEl = fixture.debugElement.query(By.css('input'));
    inputEl.triggerEventHandler('click');
    fixture.detectChanges();

    const backButtonEl = fixture.debugElement.query(By.css('button[aria-label="Back"]'));

    backButtonEl.triggerEventHandler('click');
    expect(component.active).toBeFalse();
  });

  it('should change the mode', () => {
    const inputEl1 = fixture.debugElement.queryAll(By.css('input'))[0];
    inputEl1.triggerEventHandler('click');
    fixture.detectChanges();

    const option1 = fixture.debugElement.query(By.css('mat-option'));
    option1.triggerEventHandler('click');
    fixture.detectChanges();

    const inputEl2 = fixture.debugElement.queryAll(By.css('input'))[1];
    inputEl2.triggerEventHandler('click');
    component.toStops$ = of(stops.results);
    fixture.detectChanges();

    const option2 = fixture.debugElement.query(By.css('mat-option'));
    option2.triggerEventHandler('click');
    fixture.detectChanges();

    const motoButtonEl = fixture.debugElement.query(By.css('button[aria-label="Motorcycles only"]'));
    motoButtonEl.triggerEventHandler('click');

    const mapButtonEl = fixture.debugElement.query(By.css('button[aria-label="Show the map"]'));
    mapButtonEl.triggerEventHandler('click');

    expect(component.form.get('mode')?.value).toEqual('moto');
    expect(component.displayMode).toEqual('map');
  });

  it('should clear the selected option', () => {
    const inputEl1 = fixture.debugElement.queryAll(By.css('input'))[0];
    inputEl1.triggerEventHandler('click');
    fixture.detectChanges();

    const option1 = fixture.debugElement.query(By.css('mat-option'));
    option1.triggerEventHandler('click');
    fixture.detectChanges();

    const clearButtonEl = fixture.debugElement.query(By.css('button[aria-label="Clear"]'));
    clearButtonEl.triggerEventHandler('click', new MouseEvent('click'));
    expect(component.form.get('from')?.value).toBeNull();
  });

  it('should search for stops', fakeAsync(() => {
    const inputEl1 = fixture.debugElement.queryAll(By.css('input'))[0];
    inputEl1.triggerEventHandler('click');
    inputEl1.nativeElement.value = 'Nep'
    inputEl1.nativeElement.dispatchEvent(new InputEvent('input', {bubbles: true, cancelable: false}));
    fixture.detectChanges();
    tick(500);

    expect(taxiStopServiceSpy.getList).toHaveBeenCalledWith('Nep')
  }));

  it('should search for stops', fakeAsync(() => {
    const inputEl1 = fixture.debugElement.queryAll(By.css('input'))[0];
    inputEl1.triggerEventHandler('click');
    fixture.detectChanges();

    const option1 = fixture.debugElement.query(By.css('mat-option'));
    option1.triggerEventHandler('click');
    fixture.detectChanges();

    const inputEl2 = fixture.debugElement.queryAll(By.css('input'))[1];
    inputEl2.triggerEventHandler('click');
    inputEl2.nativeElement.value = 'Nep'
    inputEl2.nativeElement.dispatchEvent(new InputEvent('input', {bubbles: true, cancelable: false}));
    fixture.detectChanges();
    tick(500);

    expect(taxiStopServiceSpy.getList).toHaveBeenCalledWith('Nep')
  }));
});
