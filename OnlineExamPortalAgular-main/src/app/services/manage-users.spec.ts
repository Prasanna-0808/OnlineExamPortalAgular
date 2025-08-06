import { TestBed } from '@angular/core/testing';

import { ManageUsers } from './manage-users';

describe('ManageUsers', () => {
  let service: ManageUsers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageUsers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
