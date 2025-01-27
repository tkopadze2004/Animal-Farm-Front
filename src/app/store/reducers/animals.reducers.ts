import { createReducer, on } from '@ngrx/store';
import * as animalActions from '../actions/animals.actions';
import { IAnimalsState } from '../states/animals.states';

const initialState: IAnimalsState = {
  animals: [],
  thanksCount: 0,
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
  })),

  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

  on(animalActions.feedAnimal, (state, { id }) => ({
    ...state,
    loading: true,
    isError: null,
  })),
  on(animalActions.feedAnimalSuccess, (state, { thanksCount, id }) => ({
    ...state,
    //vanaxleb thanks count
    animals: state.animals?.map((animal) =>
      animal._id === id ? { ...animal, thanksCount } : animal
    ),
    loading: false,
    error: null,
    thanksCount: thanksCount,
  })),

  on(animalActions.feedAnimalDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
