import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCancelConsultationComponent } from './pop-up-cancel-consultation.component';

describe('PopUpCancelConsultationComponent', () => {
  let component: PopUpCancelConsultationComponent;
  let fixture: ComponentFixture<PopUpCancelConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpCancelConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpCancelConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
