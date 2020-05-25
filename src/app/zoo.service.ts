import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import {Animal} from './model/animal.model';

@Injectable({
  providedIn: 'root'
})
export class ZooService {

  getAnimals() {
    return this.http.get<Array<Animal >>(environment.serverUrl);
  }

  addAnimal(animal: Animal) {
    return this.http.post<any>(environment.serverUrl, animal);
  }

  updateAnimal(animal: Animal) {
    const url = environment.serverUrl + '/' + animal.name;
    return this.http.put<any>(url, animal);
  }

  deleteAnimal(animal: Animal) {
    return this.http.delete<any>(environment.serverUrl + '/' + animal.name);
  }

  constructor(private http: HttpClient) {
  }

}
