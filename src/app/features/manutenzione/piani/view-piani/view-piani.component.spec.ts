import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPianiComponent } from './view-piani.component';

describe('ViewPianiComponent', () => {
  let component: ViewPianiComponent;
  let fixture: ComponentFixture<ViewPianiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPianiComponent]
    });
    fixture = TestBed.createComponent(ViewPianiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
