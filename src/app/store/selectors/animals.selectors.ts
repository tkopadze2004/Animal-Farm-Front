import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAnimalsState } from '../states/animals.states';

export const selectAnimalsState =
  createFeatureSelector<IAnimalsState>('animals');

export const selectAnimals = createSelector(
  selectAnimalsState,
  (state: IAnimalsState) => state.animals
);

export const selectFeedAnimalSuccess = createSelector(
  selectAnimalsState,
  (state: IAnimalsState) => ({
    thanksCount: state.thanksCount,
    pigStatus: state.pigStatus,
    message: state.message,
  })
);

export const selectLoadingAnimalId = createSelector(
  selectAnimalsState,
  (state: IAnimalsState) => state.loadingAnimalId
);
