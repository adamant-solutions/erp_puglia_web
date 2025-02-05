import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImpreseComponent } from './edit-imprese.component';

describe('EditImpreseComponent', () => {
  let component: EditImpreseComponent;
  let fixture: ComponentFixture<EditImpreseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditImpreseComponent]
    });
    fixture = TestBed.createComponent(EditImpreseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
