import { TestBed } from '@angular/core/testing';

import { UserReadServiceService } from './user-read-service.service';

describe('UserReadServiceService', () => {
  let service: UserReadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserReadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
