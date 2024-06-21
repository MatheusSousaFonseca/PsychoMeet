import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpRescheduleConsultationComponent } from './pop-up-reschedule-consultation.component';

describe('PopUpRescheduleConsultationComponent', () => {
  let component: PopUpRescheduleConsultationComponent;
  let fixture: ComponentFixture<PopUpRescheduleConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpRescheduleConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpRescheduleConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
