import { TestBed } from '@angular/core/testing';

import { PsychologistCreateService } from './psychologist-create.service';

describe('PsychologistCreateService', () => {
  let service: PsychologistCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsychologistCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
