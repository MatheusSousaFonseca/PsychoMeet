import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequestConsultationComponent } from './view-request-consultation.component';

describe('ViewRequestConsultationComponent', () => {
  let component: ViewRequestConsultationComponent;
  let fixture: ComponentFixture<ViewRequestConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRequestConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRequestConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
