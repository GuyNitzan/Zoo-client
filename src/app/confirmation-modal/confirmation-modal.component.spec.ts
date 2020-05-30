import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModalComponent } from './confirmation-modal.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      providers: [{ provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }]
      ,
      declarations: [ ConfirmationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
