import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrazioniComponent } from './registrazioni.component';

describe('RegistrazioniComponent', () => {
  let component: RegistrazioniComponent;
  let fixture: ComponentFixture<RegistrazioniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrazioniComponent]
    });
    fixture = TestBed.createComponent(RegistrazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
