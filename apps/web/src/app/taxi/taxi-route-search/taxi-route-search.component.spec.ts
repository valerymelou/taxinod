import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';

import { TaxiRouteSearchComponent } from './taxi-route-search.component';

@Component({
  selector: 'app-taxi-stops-results',
  template: 'app taxi stops results works'
})
class TaxiStopsResultsStubComponent {}

describe('TaxiRouteSearchComponent', () => {
  let component: TaxiRouteSearchComponent;
  let fixture: ComponentFixture<TaxiRouteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxiRouteSearchComponent, TaxiStopsResultsStubComponent],
      imports: [
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        SharedModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaxiRouteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
