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
  loadingAnimalById: null,
  feedError:null,
  statusError:null,
  statusUpdateError:null
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
    feedError: null,
    loadingAnimalById: id,
  })),
  on(
    animalActions.feedAnimalSuccess,
    (state, { thanksCount, id, pigStatus, message }) => ({
      ...state,
      animals: state.animals?.map((animal) =>
        animal._id === id ? { ...animal, thanksCount } : animal
      ),
      isLoading: false,
      feedError: null,
      thanksCount: thanksCount,
      pigStatus: pigStatus,
      message: message,
      loadingAnimalById: null,
    })
  ),

  on(animalActions.feedAnimalDataFailure, (state, { feedError }) => ({
    ...state,
    isLoading: false,
    loadingAnimalById: null,
    feedError,
  })),

  on(animalActions.clearAnimalMessages, (state) => ({
    ...state,
   feedError:null,
   message:null,
   error:null,
  })),

);
