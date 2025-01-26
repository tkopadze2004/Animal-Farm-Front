import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class AnimalsEffect {
  private readonly actions = inject(Actions);
}
