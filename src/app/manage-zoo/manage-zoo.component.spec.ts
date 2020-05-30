import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageZooComponent } from './manage-zoo.component';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ZooService} from '../zoo.service';
import {of} from 'rxjs';
import {MockZooService} from '../mock.zoo.service';

describe('ManageZooComponent', () => {
  let component: ManageZooComponent;
  let fixture: ComponentFixture<ManageZooComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: {} },
        { provide: ActivatedRoute, useValue: {queryParams: of( convertToParamMap({}))} },
        { provide: MatDialog, useValue: {} },
        { provide: ZooService, useClass: MockZooService }]
      ,
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
