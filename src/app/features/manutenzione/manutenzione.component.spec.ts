import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutenzioneComponent } from './manutenzione.component';

describe('ManutenzioneComponent', () => {
  let component: ManutenzioneComponent;
  let fixture: ComponentFixture<ManutenzioneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManutenzioneComponent]
    });
    fixture = TestBed.createComponent(ManutenzioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
