import { TestBed } from '@angular/core/testing';

import { ConsultationUpdateServiceService } from './consultation-update-service.service';

describe('ConsultationUpdateServiceService', () => {
  let service: ConsultationUpdateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationUpdateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
