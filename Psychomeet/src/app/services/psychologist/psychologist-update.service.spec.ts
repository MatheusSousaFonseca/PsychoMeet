import { TestBed } from '@angular/core/testing';

import { PsychologistUpdateService } from './psychologist-update.service';

describe('PsychologistUpdateService', () => {
  let service: PsychologistUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsychologistUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
