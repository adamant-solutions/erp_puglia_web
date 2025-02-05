import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPianiComponent } from './add-piani.component';

describe('AddPianiComponent', () => {
  let component: AddPianiComponent;
  let fixture: ComponentFixture<AddPianiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPianiComponent]
    });
    fixture = TestBed.createComponent(AddPianiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
