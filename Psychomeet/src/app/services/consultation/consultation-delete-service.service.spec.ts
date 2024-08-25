import { TestBed } from '@angular/core/testing';

import { ConsultationDeleteServiceService } from './consultation-delete-service.service';

describe('ConsultationDeleteServiceService', () => {
  let service: ConsultationDeleteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationDeleteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
