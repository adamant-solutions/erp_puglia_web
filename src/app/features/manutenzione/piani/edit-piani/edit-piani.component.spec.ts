import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPianiComponent } from './edit-piani.component';

describe('EditPianiComponent', () => {
  let component: EditPianiComponent;
  let fixture: ComponentFixture<EditPianiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPianiComponent]
    });
    fixture = TestBed.createComponent(EditPianiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
