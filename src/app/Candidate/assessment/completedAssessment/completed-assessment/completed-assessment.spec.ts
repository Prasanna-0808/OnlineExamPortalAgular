import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedAssessment } from './completed-assessment';

describe('CompletedAssessment', () => {
  let component: CompletedAssessment;
  let fixture: ComponentFixture<CompletedAssessment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedAssessment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedAssessment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
