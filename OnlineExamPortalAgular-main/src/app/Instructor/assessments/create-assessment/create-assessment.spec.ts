import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssessment } from './create-assessment';

describe('CreateAssessment', () => {
  let component: CreateAssessment;
  let fixture: ComponentFixture<CreateAssessment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAssessment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAssessment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
