import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpInformAvailabilityComponent } from './pop-up-inform-availability.component';

describe('PopUpInformAvailabilityComponent', () => {
  let component: PopUpInformAvailabilityComponent;
  let fixture: ComponentFixture<PopUpInformAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpInformAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpInformAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
