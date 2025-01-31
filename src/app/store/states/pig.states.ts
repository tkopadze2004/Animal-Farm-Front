import { IBaseState } from '../../shared/models/base/base.state.model';

export interface IPigState extends IBaseState {
  disableFeed: boolean;
  currentStatus: string | null;
}
