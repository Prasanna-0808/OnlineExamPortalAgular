import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentResult } from './assessment-result';

describe('AssessmentResult', () => {
  let component: AssessmentResult;
  let fixture: ComponentFixture<AssessmentResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
