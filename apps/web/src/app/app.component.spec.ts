import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TaxiMapService } from './taxi/taxi-map.service';

describe('AppComponent', () => {
  let taxiMapServiceSpy: jasmine.SpyObj<TaxiMapService>;
  let component: AppComponent;

  beforeEach(async () => {
    const taxiMapServiceMock = jasmine.createSpyObj('TaxiMapService', ['initializeMap']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: TaxiMapService, useValue: taxiMapServiceMock }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    taxiMapServiceSpy = TestBed.inject(TaxiMapService) as jasmine.SpyObj<TaxiMapService>;
  });

  it('should create the app', () => {

    expect(component).toBeTruthy();
    expect(taxiMapServiceSpy.initializeMap).toHaveBeenCalled();
  });
});
