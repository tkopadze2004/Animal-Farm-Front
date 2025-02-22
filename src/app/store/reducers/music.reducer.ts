import { createReducer, on } from '@ngrx/store';
import * as musicActions from '../actions/music.actions';
import { IMusicState } from '../states/music.states';

const initialState: IMusicState = {
  audioBuffer: null,
  error: null,
  isLoading: false,
};

export const musicReducer = createReducer(
  initialState,
  on(musicActions.loadMusic, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(musicActions.loadMusicSuccess, (state, { audioBuffer }) => ({
    ...state,
    isLoading: false,
    audioBuffer,
    error: null,
  })),
  on(musicActions.loadMusicFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(musicActions.stopMusic, (state) => ({
    ...state,
    audioBuffer: null,
    isLoading: false,
    error: null,
  })),
  on(musicActions.clearMusicMessages, (state)=>({
    ...state,
    error:null
  }))
);
