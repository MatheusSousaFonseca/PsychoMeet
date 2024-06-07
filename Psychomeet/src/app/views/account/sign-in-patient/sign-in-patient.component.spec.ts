import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInPatientComponent } from './sign-in-patient.component';

describe('SignInPatientComponent', () => {
  let component: SignInPatientComponent;
  let fixture: ComponentFixture<SignInPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignInPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
