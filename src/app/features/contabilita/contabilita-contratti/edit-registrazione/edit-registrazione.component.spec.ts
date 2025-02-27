import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegistrazioneComponent } from './edit-registrazione.component';

describe('EditRegistrazioneComponent', () => {
  let component: EditRegistrazioneComponent;
  let fixture: ComponentFixture<EditRegistrazioneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRegistrazioneComponent]
    });
    fixture = TestBed.createComponent(EditRegistrazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
