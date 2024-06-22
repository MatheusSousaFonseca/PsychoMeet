import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPsychologistComponent } from './search-psychologist.component';

describe('SearchPsychologistComponent', () => {
  let component: SearchPsychologistComponent;
  let fixture: ComponentFixture<SearchPsychologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPsychologistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPsychologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
