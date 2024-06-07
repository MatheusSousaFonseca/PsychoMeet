import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInPsychologistComponent } from './sign-in-psychologist.component';

describe('SignInPsychologistComponent', () => {
  let component: SignInPsychologistComponent;
  let fixture: ComponentFixture<SignInPsychologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInPsychologistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignInPsychologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
