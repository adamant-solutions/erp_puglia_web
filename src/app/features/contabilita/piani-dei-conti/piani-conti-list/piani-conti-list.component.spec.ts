import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PianiContiListComponent } from './piani-conti-list.component';

describe('PianiContiListComponent', () => {
  let component: PianiContiListComponent;
  let fixture: ComponentFixture<PianiContiListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PianiContiListComponent]
    });
    fixture = TestBed.createComponent(PianiContiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
