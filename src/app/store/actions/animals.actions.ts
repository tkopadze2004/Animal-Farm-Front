import { createAction, props } from '@ngrx/store';
import { AnimalsActionsTypes } from './animals.actions.types';
import { IAnimal, IFeedAnimalRes } from '../../core/models/animals.model';

export const getAnimalsData = createAction(AnimalsActionsTypes.GET_ANIMALS);
export const getAnimalsDataSuccess = createAction(
  AnimalsActionsTypes.GET_ANIMALS_SUCCESS,
  props<{ animals: IAnimal[] }>()
);
export const getAnimalsDataFailure = createAction(
  AnimalsActionsTypes.GET_ANIMALS_FAILURE,
  props<{ error: string }>()
);

export const feedAnimal = createAction(
  AnimalsActionsTypes.FEED_ANIMAL,
  props<{ id: string }>()
);
export const feedAnimalSuccess = createAction(
  AnimalsActionsTypes.FEED_ANIMAL_SUCCESS,
  props<IFeedAnimalRes>()
);

export const feedAnimalDataFailure = createAction(
  AnimalsActionsTypes.FEED_ANIMAL_FAILURE,
  props<{ feedError: string }>()
);

export const clearAnimalMessages = createAction(
  AnimalsActionsTypes.CLEAR_ANIMALS_MESSAGES
);
