import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IMusicState } from '../states/music.states';

export const selectMusicState = createFeatureSelector<IMusicState>('music');

export const selectMusicLoading = createSelector(
  selectMusicState,
  (state) => state.isLoading
);
