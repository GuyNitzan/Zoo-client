import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationModalComponent } from './notification-modal.component';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

describe('NotificationModalComponent', () => {
  let component: NotificationModalComponent;
  let fixture: ComponentFixture<NotificationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      providers: [{ provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }]
      ,
      declarations: [ NotificationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
