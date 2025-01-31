import { createReducer, on } from '@ngrx/store';
import * as pigActions from '../actions/pig.actions';
import { IPigState } from '../states/pig.states';

const initialState: IPigState = {
  currentStatus: null,
  disableFeed: false,
  isLoading: false,
  error: null,
};
export const PigReducer = createReducer(
  initialState,
  on(pigActions.getPigStatus, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(pigActions.getPigStatusSuccess, (state, { currentStatus }) => ({
    ...state,
    currentStatus: currentStatus,
    isLoading: false,
    error: null,
  })),
  on(pigActions.getPigStatusFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(pigActions.disableFeeding, (state) => ({ ...state, disableFeed: true })),
  on(pigActions.enableFeeding, (state) => ({ ...state, disableFeed: false }))
);
