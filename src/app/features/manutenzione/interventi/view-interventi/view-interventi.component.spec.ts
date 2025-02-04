import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInterventiComponent } from './view-interventi.component';

describe('ViewInterventiComponent', () => {
  let component: ViewInterventiComponent;
  let fixture: ComponentFixture<ViewInterventiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInterventiComponent]
    });
    fixture = TestBed.createComponent(ViewInterventiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
