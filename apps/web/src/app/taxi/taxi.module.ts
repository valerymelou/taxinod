import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SharedModule } from '../shared/shared.module';
import { TaxiStopsResultsComponent } from './taxi-stops-results/taxi-stops-results.component';
import { TaxiStopsMapComponent } from './taxi-stops-map/taxi-stops-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { TaxiRouteSearchComponent } from './taxi-route-search/taxi-route-search.component';

@NgModule({
  declarations: [
    TaxiStopsResultsComponent,
    TaxiStopsMapComponent,
    TaxiRouteSearchComponent,
  ],
  exports: [TaxiStopsResultsComponent, TaxiStopsMapComponent, TaxiRouteSearchComponent],
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ]
})
export class TaxiModule {}
