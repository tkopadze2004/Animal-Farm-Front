import { createAction, props } from '@ngrx/store';
import { PigActionsTypes } from './pig.actions.types';

export const getPigStatus = createAction(PigActionsTypes.GET_PIG_STATUS);
export const getPigStatusSuccess = createAction(
  PigActionsTypes.GET_PIG_STATUS_SUCCESS,
  props<{ pigStatus: string | null }>()
);
export const getPigStatusFailure = createAction(
  PigActionsTypes.GET_PIG_STATUS_FAILURE,
  props<{ error: string }>()
);

export const updatePigStatus = createAction(
  PigActionsTypes.UPDATE_PIG_STATUS,
  props<{ pigStatus: string }>()
);
export const updatePigStatusSuccess = createAction(
  PigActionsTypes.UPDATE_PIG_STATUS_SUCCESS,
  props<{ pigStatus: string }>()
);
export const updatePigStatusFailure = createAction(
  PigActionsTypes.UPDATE_PIG_STATUS_FAILURE,
  props<{ error: string }>()
);
