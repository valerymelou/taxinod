import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { TaxiModule } from './taxi/taxi.module';
import { PagesModule } from './pages/pages.module';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpBaseUrlInterceptor } from './core/http/http-base-url.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SharedModule,
    LayoutModule,
    TaxiModule,
    PagesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpBaseUrlInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
