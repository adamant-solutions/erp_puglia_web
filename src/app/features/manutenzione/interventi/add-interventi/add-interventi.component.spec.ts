import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterventiComponent } from './add-interventi.component';

describe('AddInterventiComponent', () => {
  let component: AddInterventiComponent;
  let fixture: ComponentFixture<AddInterventiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInterventiComponent]
    });
    fixture = TestBed.createComponent(AddInterventiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
