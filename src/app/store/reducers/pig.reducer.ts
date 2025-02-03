import { createReducer, on } from '@ngrx/store';
import * as pigActions from '../actions/pig.actions';
import { IAnimalsState } from '../states/animals.states';

const initialState: IAnimalsState = {
  pigStatus: null,
  isLoading: false,
  error: null,
  animals: [],
  thanksCount: 0,
  message: null,
  loadingAnimalById: null,
};
export const PigReducer = createReducer(
  initialState,
  on(pigActions.getPigStatus, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(pigActions.getPigStatusSuccess, (state, { pigStatus }) => ({
    ...state,
    pigStatus: pigStatus,
    isLoading: false,
    error: null,
  })),
  on(pigActions.getPigStatusFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(pigActions.updatePigStatus, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(pigActions.updatePigStatusSuccess, (state, { pigStatus }) => ({
    ...state,
    isLoading: false,
    pigStatus,
    error: null,
  })),
  on(pigActions.updatePigStatusFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
