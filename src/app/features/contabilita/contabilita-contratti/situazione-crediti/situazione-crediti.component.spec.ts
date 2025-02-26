import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituazioneCreditiComponent } from './situazione-crediti.component';

describe('SituazioneCreditiComponent', () => {
  let component: SituazioneCreditiComponent;
  let fixture: ComponentFixture<SituazioneCreditiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SituazioneCreditiComponent]
    });
    fixture = TestBed.createComponent(SituazioneCreditiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
