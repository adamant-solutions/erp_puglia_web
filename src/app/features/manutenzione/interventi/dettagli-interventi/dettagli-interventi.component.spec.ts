import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliInterventiComponent } from './dettagli-interventi.component';

describe('DettagliInterventiComponent', () => {
  let component: DettagliInterventiComponent;
  let fixture: ComponentFixture<DettagliInterventiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DettagliInterventiComponent]
    });
    fixture = TestBed.createComponent(DettagliInterventiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
