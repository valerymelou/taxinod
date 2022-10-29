import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { BaseLayoutComponent } from './base-layout.component';

describe('BaseLayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseLayoutComponent],
      imports: [RouterTestingModule, SharedModule, MatSidenavModule, NoopAnimationsModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BaseLayoutComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
