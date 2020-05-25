import {Component, OnInit } from '@angular/core';
import {Animal} from '../model/animal.model';
import {ZooService} from '../zoo.service';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {MODAL_MESSAGE} from '../global-constants';
import {GlobalService} from '../global-service';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent implements OnInit {

  animals: Animal[] = [];

  constructor(private zooService: ZooService,
              public dialog: MatDialog,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    this.updateAnimals();
  }

  deleteAnimal(animal: Animal) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: animal.name + MODAL_MESSAGE.deleteAnimalConfirmationPostfix
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {this.zooService.deleteAnimal(animal).subscribe(res => {
          this.globalService.showNotificationModal(animal.name + MODAL_MESSAGE.deleteAnimalSuccessPostfix);
          this.updateAnimals();
        }, error => {
          this.globalService.handleError(error);
        });
      }
    });
  }

  updateAnimals() {
    this.zooService.getAnimals().subscribe(animals => {
      this.animals = animals;
    });
  }

  sortData(sort: Sort) {
    this.animals.sort((animal1, animal2) => {
      switch (sort.direction) {
        case 'desc': return this.compare(animal2[sort.active], animal1[sort.active]);
        case 'asc': return this.compare(animal1[sort.active], animal2[sort.active]);
        default: return this.compare(animal1.name, animal2.name);
      }
    });
  }

  compare(a: number | string, b: number | string) {
    a = typeof a === 'string' ? a.toLowerCase() : a;
    b = typeof b === 'string' ? b.toLowerCase() : b;
    return a < b ? -1 : 1;
  }
}
