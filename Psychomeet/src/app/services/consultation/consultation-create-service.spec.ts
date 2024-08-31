import { TestBed } from '@angular/core/testing';

import { ConsultationCreateService } from './consultation-create-service';

describe('ConsultationCreateService', () => {
  let service: ConsultationCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
