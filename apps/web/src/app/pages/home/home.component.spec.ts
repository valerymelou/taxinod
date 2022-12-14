import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

@Component({
  selector: 'app-taxi-stops-map',
  template: 'taxi stops map works!'
})
export class TaxiStopsMapStubComponent {}

@Component({
  selector: 'app-taxi-route-search',
  template: 'app taxi route search works!'
})
export class TaxiRouteSearchStubComponent {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, TaxiStopsMapStubComponent, TaxiRouteSearchStubComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
