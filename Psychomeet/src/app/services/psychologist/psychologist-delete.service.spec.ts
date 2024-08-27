import { TestBed } from '@angular/core/testing';

import { PsychologistDeleteService } from './psychologist-delete.service';

describe('PsychologistDeleteService', () => {
  let service: PsychologistDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsychologistDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
