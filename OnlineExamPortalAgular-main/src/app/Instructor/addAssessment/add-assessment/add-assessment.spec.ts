import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssessment } from './add-assessment';

describe('AddAssessment', () => {
  let component: AddAssessment;
  let fixture: ComponentFixture<AddAssessment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAssessment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAssessment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
