import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScheduledConsultationComponent } from './view-scheduled-consultation.component';

describe('ViewScheduledConsultationComponent', () => {
  let component: ViewScheduledConsultationComponent;
  let fixture: ComponentFixture<ViewScheduledConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewScheduledConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewScheduledConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
