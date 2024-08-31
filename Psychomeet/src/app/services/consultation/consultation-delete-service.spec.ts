import { TestBed } from '@angular/core/testing';

import { ConsultationDeleteService } from './consultation-delete-service';

describe('ConsultationDeleteServiceService', () => {
  let service: ConsultationDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
