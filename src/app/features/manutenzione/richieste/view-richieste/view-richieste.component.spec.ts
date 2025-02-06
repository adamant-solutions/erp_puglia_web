import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRichiesteComponent } from './view-richieste.component';

describe('ViewRichiesteComponent', () => {
  let component: ViewRichiesteComponent;
  let fixture: ComponentFixture<ViewRichiesteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRichiesteComponent]
    });
    fixture = TestBed.createComponent(ViewRichiesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
