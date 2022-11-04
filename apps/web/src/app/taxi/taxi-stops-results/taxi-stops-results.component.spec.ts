import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Path } from '../path';

import { TaxiStopsResultsComponent } from './taxi-stops-results.component';

describe('TaxiStopsResultsComponent', () => {
  let component: TaxiStopsResultsComponent;
  let fixture: ComponentFixture<TaxiStopsResultsComponent>;
  const paths: Path[] = [
    {
      routes: [
        {
          origin: {
            id: '41a62e82-d111-4553-98da-dfdfac543f32',
            name: 'Neptune Tropicana',
            latitude: 3.8165028,
            longitude: 11.5260848,
          },
          destination: {
            id: '4b90d4df-cf80-41e0-9fa8-6d3b43dd31e7',
            name: 'Mvog Mbi',
            latitude: 3.8505662,
            longitude: 11.5209214,
          },
          mode: 1,
          std_price: 300,
          notes: '',
        },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxiStopsResultsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaxiStopsResultsComponent);
    component = fixture.componentInstance;
    component.paths = paths;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
