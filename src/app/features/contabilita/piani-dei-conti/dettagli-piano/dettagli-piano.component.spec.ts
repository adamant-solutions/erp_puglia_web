import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliPianoComponent } from './dettagli-piano.component';

describe('DettagliPianoComponent', () => {
  let component: DettagliPianoComponent;
  let fixture: ComponentFixture<DettagliPianoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DettagliPianoComponent]
    });
    fixture = TestBed.createComponent(DettagliPianoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
