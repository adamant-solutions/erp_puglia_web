import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorositaComponent } from './morosita.component';

describe('MorositaComponent', () => {
  let component: MorositaComponent;
  let fixture: ComponentFixture<MorositaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MorositaComponent]
    });
    fixture = TestBed.createComponent(MorositaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
