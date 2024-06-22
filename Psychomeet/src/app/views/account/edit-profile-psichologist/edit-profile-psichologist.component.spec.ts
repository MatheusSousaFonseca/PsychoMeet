import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePsichologistComponent } from './edit-profile-psichologist.component';

describe('EditProfilePsichologistComponent', () => {
  let component: EditProfilePsichologistComponent;
  let fixture: ComponentFixture<EditProfilePsichologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfilePsichologistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfilePsichologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
