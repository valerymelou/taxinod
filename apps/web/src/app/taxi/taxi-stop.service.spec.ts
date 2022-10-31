import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Results } from './results';
import { TaxiStop } from './taxi-stop';

import { TaxiStopService } from './taxi-stop.service';

describe('TaxiStopService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: TaxiStopService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new TaxiStopService(httpClientSpy);
  });

  it('should return the list of stops', (done: DoneFn) => {
    const expectedStops: Results<TaxiStop> = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          id: '1',
          name: 'Neptune',
          latitude: 1,
          longitude: 1
        }
      ]
    };
    httpClientSpy.get.and.returnValue(of(expectedStops));

    service.getList('Nep').subscribe({
      next: (results: Results<TaxiStop>) => {
        expect(results).withContext('expected results').toEqual(expectedStops);
        done();
      },
      error: done.fail
    });
  });
});
