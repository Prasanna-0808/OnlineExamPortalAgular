import { TestBed } from '@angular/core/testing';

import { InstructorAssessmentService } from './instructor-assessment-service';

describe('InstructorAssessmentService', () => {
  let service: InstructorAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructorAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
