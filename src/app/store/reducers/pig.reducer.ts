import { createReducer, on } from '@ngrx/store';
import { IAnimalsState } from '../states/animals.states';
import * as pigActions from '../actions/pig.actions';

const initialState: IAnimalsState = {
  animals: [],
  thanksCount: 0,
  loading: false,
  error: null,
  pigStatus: null,
  currentStatus: null,
  message: null,
};
export const PigReducer = createReducer(
  initialState,
  on(pigActions.getPigStatus, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(pigActions.getPigStatusSuccess, (state, { currentStatus }) => ({
    ...state,
    currentStatus: currentStatus,
    loading: false,
    error: null,
  })),
  on(pigActions.getPigStatusFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
