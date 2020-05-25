import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ZooService} from '../zoo.service';
import {Animal} from '../model/animal.model';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ACTION_TYPE, FormField, MODAL_MESSAGE} from '../global-constants';
import {GlobalService} from '../global-service';

@Component({
  selector: 'app-manage-zoo',
  templateUrl: './manage-zoo.component.html',
  styleUrls: ['./manage-zoo.component.css']
})
export class ManageZooComponent implements OnInit, AfterViewInit {

  animals: Animal[] = [];
  zooManagementForm: FormGroup;
  selectedAnimalBeforeChanges: any;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(private zooService: ZooService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    this.updateAnimals();
    // If arrived from animals component, animalFromQueryParam will hold the selected animal
    this.route.queryParams.subscribe(animalFromQueryParam => {
      this.initForm(animalFromQueryParam);
      this.selectedAnimalBeforeChanges = animalFromQueryParam.name ? animalFromQueryParam : { section: ''};
    });
  }

  private initForm(animalToUpdate: any) {
    this.zooManagementForm = new FormGroup({
      actionType: new FormControl(animalToUpdate.name ? ACTION_TYPE.updateAnimal : ACTION_TYPE.addAnimal),
      selectedAnimal: new FormControl(animalToUpdate.name),
      newAnimal: new FormControl('', animalToUpdate.name ? null : Validators.required),
      quantity: new FormControl(animalToUpdate.quantity, Validators.required),
      section: new FormControl(animalToUpdate.section, Validators.required),
      food: new FormControl(animalToUpdate.food, Validators.required),
    });
  }

  // listen to form changes and validate new values
  ngAfterViewInit(): void {
    this.selectedAnimalOnChange();
    this.actionTypeOnChange();
    this.validateUniqueName();
    this.validateUniqueSection();
  }

  // animal name must be unique
  validateUniqueName() {
    this.zooManagementForm.controls.newAnimal.valueChanges.subscribe(newName => {
      if (this.animals.map(animal => animal.name).includes(newName)) {
        this.zooManagementForm.controls.newAnimal.setErrors({multipleValues: true});
      }
    });
  }

  // section must be unique
  validateUniqueSection() {
    this.zooManagementForm.controls.section.valueChanges.subscribe(sectionEntered => {
      if (this.selectedAnimalBeforeChanges.section !== sectionEntered &&
        this.animals.map(animal => animal.section).includes(sectionEntered)) {
        this.zooManagementForm.controls.section.setErrors({multipleValues: true});
      }
    });
  }

  selectedAnimalOnChange() {
    this.zooManagementForm.get('selectedAnimal').valueChanges.subscribe(selectedAnimalName => {
      if (selectedAnimalName) {
        const animalObject = this.animals.find(animal => animal.name === selectedAnimalName);
        this.selectedAnimalBeforeChanges = animalObject;
        this.setFormValues([
          {field: 'quantity', value: animalObject.quantity},
          {field: 'section', value: animalObject.section},
          {field: 'food', value: animalObject.food}]);
      }
    });
  }

  private actionTypeOnChange() {
    this.zooManagementForm.controls.actionType.valueChanges.subscribe(newActionSelected => {
      if (newActionSelected === 'addAnimal') {
        this.setFormValues([
          {field: 'newAnimal', value: ''},
          {field: 'quantity', value: 1},
          {field: 'section', value: ''},
          {field: 'food', value: ''}]);
        this.selectedAnimalBeforeChanges = { section: ''};
        this.zooManagementForm.controls.newAnimal.setValidators(Validators.required);
      }
      else {
        this.zooManagementForm.controls.newAnimal.setErrors(null);
        this.zooManagementForm.controls.newAnimal.setValidators(null);
        this.zooManagementForm.controls.selectedAnimal.enable();
      }
    });
  }

  onFormSubmit() {
    const action = this.zooManagementForm.controls.actionType.value;
    if (action === ACTION_TYPE.addAnimal) {
      this.handleAddAnimal();
    }
    else {
      this.handleUpdateAnimal();
    }
  }

  // Fetch values from form and return them as Animal object
  createAnimalObjectForSubmission(actionType: string): Animal {
    return {
      name: actionType === ACTION_TYPE.addAnimal ?
        this.zooManagementForm.controls.newAnimal.value : this.zooManagementForm.controls.selectedAnimal.value,
      quantity: this.zooManagementForm.controls.quantity.value,
      section: this.zooManagementForm.controls.section.value,
      food: this.zooManagementForm.controls.food.value
    };
  }

  removeAnimal() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: this.zooManagementForm.controls.selectedAnimal.value + MODAL_MESSAGE.deleteAnimalConfirmationPostfix
    });
    dialogRef.afterClosed().subscribe(isConfirm => {
      if (isConfirm) {
        const animalToDelete = this.animals.find(animal =>
          animal.name === this.zooManagementForm.controls.selectedAnimal.value);
        this.zooService.deleteAnimal(animalToDelete).subscribe(res => {
          this.onSuccess(MODAL_MESSAGE.deleteAnimalSuccessPostfix, animalToDelete);
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

  // disable submit button if form is invalid, or if 'update animal' is selected but no animal is selected
  isSubmissionDisabled() {
    return !this.zooManagementForm.valid || !this.isAnimalUpdated();
  }

  isAnimalUpdated() {
    return this.zooManagementForm.controls.actionType.value === ACTION_TYPE.addAnimal ||
      (this.zooManagementForm.controls.selectedAnimal.value &&
        this.isSelectedAnimalChanged(this.createAnimalObjectForSubmission(ACTION_TYPE.updateAnimal)));
  }

  // compare the selected animal before and after changes
  isSelectedAnimalChanged(animalToUpdate: any) {
    return (JSON.stringify(this.selectedAnimalBeforeChanges) !== JSON.stringify(animalToUpdate));
  }

  private handleAddAnimal() {
    const animalToAdd = this.createAnimalObjectForSubmission(ACTION_TYPE.addAnimal);
    this.zooService.addAnimal(animalToAdd).subscribe(res => {
      this.onSuccess(MODAL_MESSAGE.addAnimalSuccessPostfix, animalToAdd);
    }, error => {
      this.globalService.handleError(error);
    });
  }

  private handleUpdateAnimal() {
    const animalToUpdate = this.createAnimalObjectForSubmission(ACTION_TYPE.updateAnimal);
    this.zooService.updateAnimal(animalToUpdate).subscribe(res => {
      this.onSuccess(MODAL_MESSAGE.updateAnimalSuccessPostfix, animalToUpdate);
    }, error => {
      this.globalService.handleError(error);
    });
  }

  private setFormValues(newValues: FormField[]) {
    for (const element of newValues) {
      this.zooManagementForm.controls[element.field].setValue(element.value);
    }
  }

  private onSuccess(messagePostfix: string, animal: Animal) {
    this.globalService.showNotificationModal(animal.name + messagePostfix);
    this.updateAnimals();
    this.formGroupDirective.resetForm();
    this.zooManagementForm.controls.actionType.setValue(ACTION_TYPE.addAnimal);
  }
}
