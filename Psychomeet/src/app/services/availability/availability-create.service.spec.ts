import { TestBed } from '@angular/core/testing';

import { AvailabilityCreateService } from './availability-create.service';

describe('AvailabilityCreateService', () => {
  let service: AvailabilityCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailabilityCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
