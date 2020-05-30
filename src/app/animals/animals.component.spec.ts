import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsComponent } from './animals.component';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {ZooService} from '../zoo.service';
import {MockZooService} from '../mock.zoo.service';

describe('AnimalsComponent', () => {
  let component: AnimalsComponent;
  let fixture: ComponentFixture<AnimalsComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: ZooService, useClass: MockZooService }],
      declarations: [ AnimalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
