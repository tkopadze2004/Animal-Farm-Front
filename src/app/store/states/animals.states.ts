import { IAnimal } from '../../core/models/animals.model';

export interface IAnimalsState {
  animals?: IAnimal[];
  thanksCount?: number;
  loading: boolean;
  error: string | null;
  pigStatus?: string | null;
  currentStatus: string | null;
  message: string | null;
  disableFeed:boolean
}
