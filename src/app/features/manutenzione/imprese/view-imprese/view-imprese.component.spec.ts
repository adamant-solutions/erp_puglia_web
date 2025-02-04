import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewImpreseComponent } from './view-imprese.component';

describe('ViewImpreseComponent', () => {
  let component: ViewImpreseComponent;
  let fixture: ComponentFixture<ViewImpreseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewImpreseComponent]
    });
    fixture = TestBed.createComponent(ViewImpreseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
