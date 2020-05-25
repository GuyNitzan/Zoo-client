import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageZooComponent } from './manage-zoo.component';

describe('ManageZooComponent', () => {
  let component: ManageZooComponent;
  let fixture: ComponentFixture<ManageZooComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageZooComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageZooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
