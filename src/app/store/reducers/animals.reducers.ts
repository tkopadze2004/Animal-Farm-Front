import { createReducer, on } from '@ngrx/store';
import * as animalActions from '../actions/animals.actions';
import { IAnimalsState } from '../states/animals.states';

const initialState: IAnimalsState = {
  animals: [],
  thanksCount: 0,
  error: null,
  pigStatus: null,
  message: null,
  isLoading: false,
  loadingAnimalId: null,
};

export const AnimalsReducer = createReducer(
  initialState,
  on(animalActions.getAnimalsData, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(animalActions.getAnimalsDataSuccess, (state, { animals }) => ({
    ...state,
    animals: animals,
    isLoading: false,
    error: null,
  })),
  on(animalActions.getAnimalsDataFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(animalActions.feedAnimal, (state, { id }) => ({
    ...state,
    isLoading: true,
    error: null,
    loadingAnimalId: id,
  })),
  on(
    animalActions.feedAnimalSuccess,
    (state, { thanksCount, id, pigStatus, message }) => ({
      ...state,
      animals: state.animals?.map((animal) =>
        animal._id === id ? { ...animal, thanksCount } : animal
      ),
      isLoading: false,
      error: null,
      thanksCount: thanksCount,
      pigStatus: pigStatus,
      message: message,
      loadingAnimalId: null,
    })
  ),

  on(animalActions.feedAnimalDataFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    loadingAnimalId: null,
    error,
  }))
);
