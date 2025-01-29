import { createAction, props } from '@ngrx/store';
import { AnimalsActionsTypes } from './animals.actions.types';
import { IAnimal } from '../../core/models/animals.model';

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
  props<{ thanksCount: number; id: string; pigStatus: string }>()
);

export const feedAnimalDataFailure = createAction(
  AnimalsActionsTypes.FEED_ANIMAL_FAILURE,
  props<{ error: string }>()
);
