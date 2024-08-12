import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformAvailabilityComponent } from './inform-availability.component';

describe('InformAvailabilityComponent', () => {
  let component: InformAvailabilityComponent;
  let fixture: ComponentFixture<InformAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
