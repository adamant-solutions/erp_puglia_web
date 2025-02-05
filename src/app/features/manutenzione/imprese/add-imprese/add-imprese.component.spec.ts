import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImpreseComponent } from './add-imprese.component';

describe('AddImpreseComponent', () => {
  let component: AddImpreseComponent;
  let fixture: ComponentFixture<AddImpreseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddImpreseComponent]
    });
    fixture = TestBed.createComponent(AddImpreseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
