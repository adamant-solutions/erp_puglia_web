import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPianoComponent } from './edit-piano.component';

describe('EditPianoComponent', () => {
  let component: EditPianoComponent;
  let fixture: ComponentFixture<EditPianoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPianoComponent]
    });
    fixture = TestBed.createComponent(EditPianoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
