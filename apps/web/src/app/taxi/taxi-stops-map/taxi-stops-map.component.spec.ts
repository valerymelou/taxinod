import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from '../../shared/shared.module';

import { TaxiStopsMapComponent } from './taxi-stops-map.component';

describe('TaxiStopsMapComponent', () => {
  let component: TaxiStopsMapComponent;
  let fixture: ComponentFixture<TaxiStopsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxiStopsMapComponent],
      imports: [
        SharedModule,
        GoogleMapsModule,
        HttpClientTestingModule,
        HttpClientJsonpModule,
      ],
    });

    fixture = TestBed.createComponent(TaxiStopsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
