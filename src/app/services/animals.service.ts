import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService extends ApiService {
  getAnimals(): Observable<any[]> {
    return this.get<any[]>(`animals`);
  }
}
