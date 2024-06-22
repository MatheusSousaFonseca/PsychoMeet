import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfilePatientComponent } from './my-profile-patient.component';

describe('MyProfilePatientComponent', () => {
  let component: MyProfilePatientComponent;
  let fixture: ComponentFixture<MyProfilePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProfilePatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProfilePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
