import { TestBed } from '@angular/core/testing';

import { UserCreateServiceService } from './user-create-service.service';

describe('UserCreateServiceService', () => {
  let service: UserCreateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCreateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
