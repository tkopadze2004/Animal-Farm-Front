import { createReducer, on } from '@ngrx/store';
import * as animalActions from '../actions/animals.actions';
import { IAnimalsState } from '../states/animals.states';

const initialState: IAnimalsState = {
  animals: [],
  loading: false,
  error: null,
};

export const AnimalsReducer = createReducer(
  initialState,
  on(animalActions.getAnimalsData, (state) => ({
    ...state,
    loading: true,
    isError: null,
  })),
  on(animalActions.getAnimalsDataSuccess, (state, { animals }) => ({
    ...state,
    animals: animals,
    loading: false,
    error: null,
  })),
  on(animalActions.getAnimalsDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
