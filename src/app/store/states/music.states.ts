import { IBaseState } from '../../shared/models/base/base.state.model';

export interface IMusicState extends IBaseState {
  audioBuffer: AudioBuffer | null;
}
