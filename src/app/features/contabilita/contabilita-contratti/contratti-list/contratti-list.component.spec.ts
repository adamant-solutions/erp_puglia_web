import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrattiListComponent } from './contratti-list.component';

describe('ContrattiListComponent', () => {
  let component: ContrattiListComponent;
  let fixture: ComponentFixture<ContrattiListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContrattiListComponent]
    });
    fixture = TestBed.createComponent(ContrattiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
