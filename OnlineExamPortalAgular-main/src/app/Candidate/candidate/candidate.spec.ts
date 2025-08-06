import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Condidate } from './candidate';

describe('Condidate', () => {
  let component: Condidate;
  let fixture: ComponentFixture<Condidate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Condidate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Condidate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
