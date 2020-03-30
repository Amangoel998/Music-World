import { TestBed } from '@angular/core/testing';

import { ArtistsdataService } from './artistsdata.service';

describe('ArtistsdataService', () => {
  let service: ArtistsdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistsdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
