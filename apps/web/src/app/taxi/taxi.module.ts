import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TaxiStopsResultsComponent } from './taxi-stops-results/taxi-stops-results.component';
import { TaxiStopsMapComponent } from './taxi-stops-map/taxi-stops-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [TaxiStopsResultsComponent, TaxiStopsMapComponent],
  exports: [TaxiStopsResultsComponent, TaxiStopsMapComponent],
  imports: [GoogleMapsModule, HttpClientModule, HttpClientJsonpModule, SharedModule],
})
export class TaxiModule {}
