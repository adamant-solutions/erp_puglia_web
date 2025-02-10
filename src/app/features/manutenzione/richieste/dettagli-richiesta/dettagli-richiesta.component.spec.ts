import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliRichiestaComponent } from './dettagli-richiesta.component';

describe('DettagliRichiestaComponent', () => {
  let component: DettagliRichiestaComponent;
  let fixture: ComponentFixture<DettagliRichiestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DettagliRichiestaComponent]
    });
    fixture = TestBed.createComponent(DettagliRichiestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
