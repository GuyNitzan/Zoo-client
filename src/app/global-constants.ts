export const ACTION_TYPE = {
  addAnimal: 'addAnimal',
  updateAnimal: 'updateAnimal'
};
export const MODAL_MESSAGE = {
  updateAnimalSuccessPostfix: ' was successfully updated',
  addAnimalSuccessPostfix: ' was successfully added to the zoo',
  deleteAnimalSuccessPostfix: ' was successfully removed from the zoo',
  deleteAnimalConfirmationPostfix: ' will be removed from the zoo. are you sure?'
};
export interface FormField {
  field: string;
  value: any;
}
