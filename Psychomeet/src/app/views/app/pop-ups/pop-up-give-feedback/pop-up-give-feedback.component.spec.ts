import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpGiveFeedbackComponent } from './pop-up-give-feedback.component';

describe('PopUpGiveFeedbackComponent', () => {
  let component: PopUpGiveFeedbackComponent;
  let fixture: ComponentFixture<PopUpGiveFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpGiveFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpGiveFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
