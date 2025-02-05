import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliImpreseComponent } from './dettagli-imprese.component';

describe('DettagliImpreseComponent', () => {
  let component: DettagliImpreseComponent;
  let fixture: ComponentFixture<DettagliImpreseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DettagliImpreseComponent]
    });
    fixture = TestBed.createComponent(DettagliImpreseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
