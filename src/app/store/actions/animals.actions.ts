import { createAction } from '@ngrx/store';
import { AnimalsActionsTypes } from './animals.actions.types';

export const getAnimalsData = createAction(AnimalsActionsTypes.GET_ANIMALS);
