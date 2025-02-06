import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppaltiComponent } from './add-appalti.component';

describe('AddAppaltiComponent', () => {
  let component: AddAppaltiComponent;
  let fixture: ComponentFixture<AddAppaltiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAppaltiComponent]
    });
    fixture = TestBed.createComponent(AddAppaltiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
