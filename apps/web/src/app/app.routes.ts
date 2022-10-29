import { Route } from '@angular/router';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  }
];
