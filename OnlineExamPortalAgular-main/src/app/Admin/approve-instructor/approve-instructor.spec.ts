import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveInstructor } from './approve-instructor';

describe('ApproveInstructor', () => {
  let component: ApproveInstructor;
  let fixture: ComponentFixture<ApproveInstructor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveInstructor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveInstructor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
