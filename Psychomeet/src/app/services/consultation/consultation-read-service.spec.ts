import { TestBed } from '@angular/core/testing';

import { ConsultationReadService } from './consultation-read-service';

describe('ConsultationReadService', () => {
  let service: ConsultationReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
