import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRichiesteComponent } from './add-richieste.component';

describe('AddRichiesteComponent', () => {
  let component: AddRichiesteComponent;
  let fixture: ComponentFixture<AddRichiesteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRichiesteComponent]
    });
    fixture = TestBed.createComponent(AddRichiesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
