import { NgModule } from '@angular/core';

import { TaxiModule } from '../taxi/taxi.module';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, PagesRoutingModule, TaxiModule]
})
export class PagesModule {}
