import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliAppaltiComponent } from './dettagli-appalti.component';

describe('DettagliAppaltiComponent', () => {
  let component: DettagliAppaltiComponent;
  let fixture: ComponentFixture<DettagliAppaltiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DettagliAppaltiComponent]
    });
    fixture = TestBed.createComponent(DettagliAppaltiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
