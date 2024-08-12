import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAcceptConsultationComponent } from './pop-up-accept-consultation.component';

describe('PopUpAcceptConsultationComponent', () => {
  let component: PopUpAcceptConsultationComponent;
  let fixture: ComponentFixture<PopUpAcceptConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpAcceptConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpAcceptConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
