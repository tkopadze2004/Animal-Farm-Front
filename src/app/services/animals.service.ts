import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { IAnimal, IFeedAnimalRes } from '../core/models/animals.model';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService extends ApiService {
  getAnimals(): Observable<IAnimal[]> {
    return this.get<IAnimal[]>(`animals`);
  }

  feedAnimal(id: string): Observable<IFeedAnimalRes> {
    return this.put<IFeedAnimalRes>(`animals/${id}/feed`);
  }
}
