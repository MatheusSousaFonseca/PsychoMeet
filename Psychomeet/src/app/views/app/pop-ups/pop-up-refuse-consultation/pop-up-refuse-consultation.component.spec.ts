import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpRefuseConsultationComponent } from './pop-up-refuse-consultation.component';

describe('PopUpRefuseConsultationComponent', () => {
  let component: PopUpRefuseConsultationComponent;
  let fixture: ComponentFixture<PopUpRefuseConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpRefuseConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpRefuseConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
