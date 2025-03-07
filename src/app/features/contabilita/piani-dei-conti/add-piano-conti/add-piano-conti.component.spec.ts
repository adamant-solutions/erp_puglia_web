import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPianoContiComponent } from './add-piano-conti.component';

describe('AddPianoContiComponent', () => {
  let component: AddPianoContiComponent;
  let fixture: ComponentFixture<AddPianoContiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPianoContiComponent]
    });
    fixture = TestBed.createComponent(AddPianoContiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
