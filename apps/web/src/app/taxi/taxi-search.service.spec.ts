import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Path } from './path';

import { TaxiSearchService } from './taxi-search.service';

describe('TaxiSearchService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: TaxiSearchService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new TaxiSearchService(httpClientSpy);
  });

  it('should return search results', (done: DoneFn) => {
    const expectedPaths: Path[] = [
      {
        routes: [
          {
            origin: {
              id: '1',
              name: 'Neptune Tropicana',
              latitude: 3.8165028,
              longitude: 11.5260848,
            },
            destination: {
              id: '2',
              name: 'Mvog Mbi',
              latitude: 3.8505662,
              longitude: 11.5209214,
            },
            mode: 1,
            std_price: 300,
            notes: '',
          },
        ],
      },
    ];
    httpClientSpy.get.and.returnValue(of(expectedPaths));
    service.search({from: '1', to: '2'}).subscribe({
      next: (paths: Path[]) => {
        expect(paths).toEqual(expectedPaths);
        done();
      },
      error: done.fail
    });
  });
});
