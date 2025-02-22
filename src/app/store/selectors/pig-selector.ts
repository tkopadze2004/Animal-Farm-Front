import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAnimalsState } from '../states/animals.states';

export const selectPigState = createFeatureSelector<IAnimalsState>('pig');

export const selectPigStatus = createSelector(
  selectPigState,
  (state: IAnimalsState) => state.pigStatus
);

export const pigStatusFail = createSelector(
  selectPigState,
  (state:IAnimalsState)=> state.statusError
)


export const selectPigStatusUpdateFail = createSelector(
  selectPigState,
  (state: IAnimalsState) => state.statusUpdateError
);

