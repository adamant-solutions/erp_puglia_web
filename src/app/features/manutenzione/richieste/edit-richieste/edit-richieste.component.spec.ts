import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRichiesteComponent } from './edit-richieste.component';

describe('EditRichiesteComponent', () => {
  let component: EditRichiesteComponent;
  let fixture: ComponentFixture<EditRichiesteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRichiesteComponent]
    });
    fixture = TestBed.createComponent(EditRichiesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
