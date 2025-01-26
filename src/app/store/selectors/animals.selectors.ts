import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAnimalsState } from '../states/animals.states';

export const selectSliderState = createFeatureSelector<IAnimalsState>('animals');

export const selectSliders = createSelector(
  selectSliderState,
  (state: IAnimalsState) => state.animals
);
