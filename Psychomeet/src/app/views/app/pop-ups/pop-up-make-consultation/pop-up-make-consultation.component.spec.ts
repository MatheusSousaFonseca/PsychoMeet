import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpMakeConsultationComponent } from './pop-up-make-consultation.component';

describe('PopUpMakeConsultationComponent', () => {
  let component: PopUpMakeConsultationComponent;
  let fixture: ComponentFixture<PopUpMakeConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpMakeConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpMakeConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
