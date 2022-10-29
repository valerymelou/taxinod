import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav'
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BaseLayoutComponent],
  imports: [RouterModule, MatSidenavModule, SharedModule],
})
export class LayoutModule {}
