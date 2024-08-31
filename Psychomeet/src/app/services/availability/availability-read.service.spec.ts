import { TestBed } from '@angular/core/testing';

import { AvailabilityReadService } from './availability-read.service';

describe('AvailabilityReadService', () => {
  let service: AvailabilityReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailabilityReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
