import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppaltiComponent } from './edit-appalti.component';

describe('EditAppaltiComponent', () => {
  let component: EditAppaltiComponent;
  let fixture: ComponentFixture<EditAppaltiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAppaltiComponent]
    });
    fixture = TestBed.createComponent(EditAppaltiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
