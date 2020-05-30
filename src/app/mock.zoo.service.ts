import {of} from 'rxjs';

export class MockZooService {

  getAnimals() {
    return of([]);
  }
}
