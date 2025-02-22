import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAnimalsState } from '../states/animals.states';

export const selectAnimalsState =
  createFeatureSelector<IAnimalsState>('animals');

export const selectAnimals = createSelector(
  selectAnimalsState,
  (state: IAnimalsState) => state.animals
);

export const selectAnimalsFail = createSelector(
  selectAnimalsState,
  (state:IAnimalsState) => state.error
)

export const selectFeedAnimalSuccess = createSelector(
  selectAnimalsState,
  (state: IAnimalsState) => ({
    thanksCount: state.thanksCount,
    pigStatus: state.pigStatus,
    message: state.message,
  })
);

export const selectAnimalFeedLoading = createSelector(
  selectAnimalsState,
  (state: IAnimalsState) => state.loadingAnimalById
);

export const selectAnimalFeedFail = createSelector(
  selectAnimalsState,
  (state: IAnimalsState) => state.feedError
);
