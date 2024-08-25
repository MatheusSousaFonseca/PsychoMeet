import { TestBed } from '@angular/core/testing';

import { UserDeleteServiceService } from './user-delete-service.service';

describe('UserDeleteServiceService', () => {
  let service: UserDeleteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDeleteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
