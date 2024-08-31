import { TestBed } from '@angular/core/testing';

import { ConsultationUpdateService } from './consultation-update-service';

describe('ConsultationUpdateService', () => {
  let service: ConsultationUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
