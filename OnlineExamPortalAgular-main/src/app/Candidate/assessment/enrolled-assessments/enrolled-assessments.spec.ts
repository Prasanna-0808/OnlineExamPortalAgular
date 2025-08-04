import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledAssessments } from './enrolled-assessments';

describe('EnrolledAssessments', () => {
  let component: EnrolledAssessments;
  let fixture: ComponentFixture<EnrolledAssessments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrolledAssessments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrolledAssessments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
