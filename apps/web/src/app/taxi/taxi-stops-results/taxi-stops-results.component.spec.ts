import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxiStopsResultsComponent } from './taxi-stops-results.component';

describe('TaxiStopsResultsComponent', () => {
  let component: TaxiStopsResultsComponent;
  let fixture: ComponentFixture<TaxiStopsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxiStopsResultsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaxiStopsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
