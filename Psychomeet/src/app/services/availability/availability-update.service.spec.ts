import { TestBed } from '@angular/core/testing';

import { AvailabilityUpdateService } from './availability-update.service';

describe('AvailabilityUpdateService', () => {
  let service: AvailabilityUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailabilityUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
