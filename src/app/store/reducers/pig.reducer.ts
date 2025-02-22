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
  feedError:null,
  statusError:null,
  statusUpdateError:null
};
export const PigReducer = createReducer(
  initialState,
  on(pigActions.getPigStatus, (state) => ({
    ...state,
    isLoading: true,
    statusError: null,
  })),
  on(pigActions.getPigStatusSuccess, (state, { pigStatus }) => ({
    ...state,
    pigStatus: pigStatus,
    isLoading: false,
    statusError: null,
  })),
  on(pigActions.getPigStatusFailure, (state, { statusError }) => ({
    ...state,
    isLoading: false,
    statusError,
  })),

  on(pigActions.updatePigStatus, (state) => ({
    ...state,
    isLoading: true,
    statusUpdateError: null,
  })),
  on(pigActions.updatePigStatusSuccess, (state, { pigStatus }) => ({
    ...state,
    isLoading: false,
    pigStatus,
    statusUpdateError: null,
  })),
  on(pigActions.updatePigStatusFailure, (state, { statusUpdateError }) => ({
    ...state,
    isLoading: false,
    statusUpdateError,
  })),
    on(pigActions.clearPigMessagess, (state) => ({
      ...state,
      statusError:null,
      statusUpdateError:null
    })),
  
);
