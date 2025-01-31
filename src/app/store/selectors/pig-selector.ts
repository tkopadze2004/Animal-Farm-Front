import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAnimalsState } from '../states/animals.states';

export const selectPigState = createFeatureSelector<IAnimalsState>('pig');

export const selectPigStatus = createSelector(
  selectPigState,
  (state: IAnimalsState) => state.currentStatus
);
export const selectDisableFeed = createSelector(selectPigState, (state) => state.disableFeed);
