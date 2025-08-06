import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssessment } from './update-assessment';

describe('UpdateAssessment', () => {
  let component: UpdateAssessment;
  let fixture: ComponentFixture<UpdateAssessment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAssessment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAssessment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
