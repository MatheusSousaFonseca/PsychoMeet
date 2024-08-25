import { TestBed } from '@angular/core/testing';

import { ConsultationReadServiceService } from './consultation-read-service.service';

describe('ConsultationReadServiceService', () => {
  let service: ConsultationReadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationReadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
