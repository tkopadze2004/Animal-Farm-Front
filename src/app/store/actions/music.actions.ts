import { createAction, props } from '@ngrx/store';
import { MusicActionsTypes } from './music.actions.types';

export const loadMusic = createAction(
  MusicActionsTypes.LOAD_MUSIC,
  props<{ filePath: string }>()
);

export const loadMusicSuccess = createAction(
  MusicActionsTypes.LOAD_MUSIC_SUCCESS,
  props<{ audioBuffer: AudioBuffer }>()
);

export const loadMusicFailure = createAction(
  MusicActionsTypes.LOAD_MUSIC_FAILURE,
  props<{ error: string }>()
);

export const stopMusic = createAction(MusicActionsTypes.STOP_MUSIC);

export const clearMusicMessages = createAction(MusicActionsTypes.CLEAR_AUDIO_MESSAGES)