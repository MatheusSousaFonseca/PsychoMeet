import { TestBed } from '@angular/core/testing';

import { AvailabilityDeleteService } from './availability-delete.service';

describe('AvailabilityDeleteService', () => {
  let service: AvailabilityDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailabilityDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
