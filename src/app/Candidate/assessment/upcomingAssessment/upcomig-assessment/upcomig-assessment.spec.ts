import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomigAssessment } from './upcomig-assessment';

describe('UpcomigAssessment', () => {
  let component: UpcomigAssessment;
  let fixture: ComponentFixture<UpcomigAssessment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomigAssessment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomigAssessment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
