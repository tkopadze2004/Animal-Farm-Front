import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { Observable } from 'rxjs';
import { IPigStatus } from '../core/models/pig.model';

@Injectable({
  providedIn: 'root',
})
export class PigStatusService extends ApiService {
  getStatus(): Observable<IPigStatus> {
    return this.get<IPigStatus>('bidzina/status');
  }

  updatePigStatus(status: string): Observable<IPigStatus> {
    return this.post<IPigStatus>('bidzina/update', {
      status,
    });
  }
}
