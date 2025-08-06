import { TestBed } from '@angular/core/testing';

import { ApproveInstructor } from './approve-instructor';

describe('ApproveInstructor', () => {
  let service: ApproveInstructor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproveInstructor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
