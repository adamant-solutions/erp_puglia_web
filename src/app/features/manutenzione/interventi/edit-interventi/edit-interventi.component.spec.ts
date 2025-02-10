import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInterventiComponent } from './edit-interventi.component';

describe('EditInterventiComponent', () => {
  let component: EditInterventiComponent;
  let fixture: ComponentFixture<EditInterventiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInterventiComponent]
    });
    fixture = TestBed.createComponent(EditInterventiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
