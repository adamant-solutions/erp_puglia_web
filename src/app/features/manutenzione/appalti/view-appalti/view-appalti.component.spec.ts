import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppaltiComponent } from './view-appalti.component';

describe('ViewAppaltiComponent', () => {
  let component: ViewAppaltiComponent;
  let fixture: ComponentFixture<ViewAppaltiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAppaltiComponent]
    });
    fixture = TestBed.createComponent(ViewAppaltiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
