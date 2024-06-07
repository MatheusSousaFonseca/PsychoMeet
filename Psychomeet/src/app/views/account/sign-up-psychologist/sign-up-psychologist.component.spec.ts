import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPsychologistComponent } from './sign-up-psychologist.component';

describe('SignUpPsychologistComponent', () => {
  let component: SignUpPsychologistComponent;
  let fixture: ComponentFixture<SignUpPsychologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpPsychologistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpPsychologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
