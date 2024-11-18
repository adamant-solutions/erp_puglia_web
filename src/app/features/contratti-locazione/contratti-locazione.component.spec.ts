import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContrattiLocazioneComponent} from './contratti-locazione.component';

describe('ContrattiLocazioneComponent', () => {
  let component: ContrattiLocazioneComponent;
  let fixture: ComponentFixture<ContrattiLocazioneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContrattiLocazioneComponent]
    });
    fixture = TestBed.createComponent(ContrattiLocazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
