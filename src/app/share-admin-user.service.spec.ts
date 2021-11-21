import { TestBed } from '@angular/core/testing';

import { ShareAdminUserService } from './share-admin-user.service';

describe('ShareAdminUserService', () => {
  let service: ShareAdminUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareAdminUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
