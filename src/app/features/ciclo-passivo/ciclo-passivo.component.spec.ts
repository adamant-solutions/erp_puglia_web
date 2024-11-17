import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CicloPassivoComponent} from './ciclo-passivo.component';

describe('CicloPassivoComponent', () => {
  let component: CicloPassivoComponent;
  let fixture: ComponentFixture<CicloPassivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CicloPassivoComponent]
    });
    fixture = TestBed.createComponent(CicloPassivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
