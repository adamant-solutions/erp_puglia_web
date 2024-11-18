import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContabilitaComponent} from './contabilita.component';

describe('ContabilitaComponent', () => {
  let component: ContabilitaComponent;
  let fixture: ComponentFixture<ContabilitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContabilitaComponent]
    });
    fixture = TestBed.createComponent(ContabilitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
