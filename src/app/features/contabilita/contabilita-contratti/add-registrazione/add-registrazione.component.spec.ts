import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegistrazioneComponent } from './add-registrazione.component';

describe('AddRegistrazioneComponent', () => {
  let component: AddRegistrazioneComponent;
  let fixture: ComponentFixture<AddRegistrazioneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRegistrazioneComponent]
    });
    fixture = TestBed.createComponent(AddRegistrazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
