import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TaxiMapService } from './taxi-map.service';
import { TaxiRoute } from './taxi-route';

describe('TaxiMapService', () => {
  let service: TaxiMapService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpClientMock = jasmine.createSpyObj('HttpClient', ['jsonp']);

    TestBed.configureTestingModule({
      imports: [ ],
      providers: [
        { provide: HttpClient, useValue: httpClientMock}
      ]
    });
    service = TestBed.inject(TaxiMapService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit taxi routes', () => {
    const expectedRoutes: TaxiRoute[] = [{
      origin: {
        id: '1',
        name: 'Neptune Tropicana',
        longitude: 1,
        latitude: 1
      },
      destination: {
        id: '1',
        name: 'Central Post',
        longitude: 1,
        latitude: 1
      },
      std_price: 300,
      notes: '',
      mode: 1
    }];
    service.update(expectedRoutes);
    service.getRoutes().subscribe((routes: TaxiRoute[]) => {
      expect(routes).toEqual(expectedRoutes);
    });
  });

  it('should initialise the map (http client called once)', () => {
    httpClientSpy.jsonp.and.returnValue(of(true));
    service.initializeMap();
    service.getMapReady().subscribe((ready: boolean) => {
      expect(ready).toBe(true);
    });

    expect(httpClientSpy.jsonp.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should not initialise the map (http client called once)', () => {
    httpClientSpy.jsonp.and.returnValue(throwError(() => false));
    service.initializeMap();
    service.getMapReady().subscribe((ready: boolean) => {
      expect(ready).toBe(false);
    });

    expect(httpClientSpy.jsonp.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should get mapReady$ subject', () => {
    service.getMapReady().next(true);

    service.getMapReady().subscribe((ready: boolean) => {
      expect(ready).toBe(true); // Initial value of the behavior subject
    });
  });
});
