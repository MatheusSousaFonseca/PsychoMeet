import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfilePsichologistComponent } from './my-profile-psichologist.component';

describe('MyProfilePsichologistComponent', () => {
  let component: MyProfilePsichologistComponent;
  let fixture: ComponentFixture<MyProfilePsichologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProfilePsichologistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProfilePsichologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
