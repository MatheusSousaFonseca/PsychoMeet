import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConsultationPatientComponent } from './view-consultation-patient.component';

describe('ViewConsultationPatientComponent', () => {
  let component: ViewConsultationPatientComponent;
  let fixture: ComponentFixture<ViewConsultationPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewConsultationPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewConsultationPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
