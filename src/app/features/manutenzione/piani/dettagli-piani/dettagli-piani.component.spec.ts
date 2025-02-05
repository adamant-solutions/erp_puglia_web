import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliPianiComponent } from './dettagli-piani.component';

describe('DettagliPianiComponent', () => {
  let component: DettagliPianiComponent;
  let fixture: ComponentFixture<DettagliPianiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DettagliPianiComponent]
    });
    fixture = TestBed.createComponent(DettagliPianiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
