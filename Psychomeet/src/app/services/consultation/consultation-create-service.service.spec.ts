import { TestBed } from '@angular/core/testing';

import { ConsultationCreateServiceService } from './consultation-create-service.service';

describe('ConsultationCreateServiceService', () => {
  let service: ConsultationCreateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationCreateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
