import { TestBed } from '@angular/core/testing';

import { PsychologistReadService } from './psychologist-read.service';

describe('PsychologistReadService', () => {
  let service: PsychologistReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsychologistReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
