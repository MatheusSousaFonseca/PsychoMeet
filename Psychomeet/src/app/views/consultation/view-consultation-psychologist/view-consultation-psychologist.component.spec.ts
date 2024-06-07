import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConsultationPsychologistComponent } from './view-consultation-psychologist.component';

describe('ViewConsultationPsychologistComponent', () => {
  let component: ViewConsultationPsychologistComponent;
  let fixture: ComponentFixture<ViewConsultationPsychologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewConsultationPsychologistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewConsultationPsychologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
