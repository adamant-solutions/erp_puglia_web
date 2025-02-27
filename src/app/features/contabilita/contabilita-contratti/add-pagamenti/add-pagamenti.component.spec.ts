import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPagamentiComponent } from './add-pagamenti.component';

describe('AddPagamentiComponent', () => {
  let component: AddPagamentiComponent;
  let fixture: ComponentFixture<AddPagamentiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPagamentiComponent]
    });
    fixture = TestBed.createComponent(AddPagamentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
