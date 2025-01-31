import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPigState } from '../states/pig.states';

export const selectPigState = createFeatureSelector<IPigState>('pig');

export const selectPigStatus = createSelector(
  selectPigState,
  (state: IPigState) => state.currentStatus
);
export const selectDisableFeed = createSelector(
  selectPigState,
  (state: IPigState) => state.disableFeed
);
