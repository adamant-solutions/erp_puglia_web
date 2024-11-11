import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RipartizioneSpeseComponent } from './ripartizione-spese.component';

describe('RipartizioneSpeseComponent', () => {
  let component: RipartizioneSpeseComponent;
  let fixture: ComponentFixture<RipartizioneSpeseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RipartizioneSpeseComponent]
    });
    fixture = TestBed.createComponent(RipartizioneSpeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
