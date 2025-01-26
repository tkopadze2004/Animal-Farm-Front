import { createAction, props } from '@ngrx/store';
import { AnimalsActionsTypes } from './animals.actions.types';

export const getAnimalsData = createAction(AnimalsActionsTypes.GET_ANIMALS);
export const getAnimalsDataSuccess = createAction(
  AnimalsActionsTypes.GET_ANIMALS_SUCCESS,
  props<{ animals: any[] }>()
);
export const getAnimalsDataFailure = createAction(
  AnimalsActionsTypes.GET_ANIMALS_FAILURE,
  props<{ error: string }>()
);
