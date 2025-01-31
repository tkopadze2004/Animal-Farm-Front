import { createAction, props } from '@ngrx/store';
import { PigActionsTypes } from './pig.actions.types';
import { IPigStatus } from '../../core/models/pig.model';

export const getPigStatus = createAction(PigActionsTypes.GET_PIG_STATUS);
export const getPigStatusSuccess = createAction(
  PigActionsTypes.GET_PIG_STATUS_SUCCESS,
  props<IPigStatus>()
);
export const getPigStatusFailure = createAction(
  PigActionsTypes.GET_PIG_STATUS_FAILURE,
  props<{ error: string }>()
);
export const setPigStatus = createAction(
  '[Pig] Set Status',
  props<{ status: string }>()
);


export const disableFeeding = createAction('[Pig] Disable Feeding');
export const enableFeeding = createAction('[Pig] Enable Feeding');
