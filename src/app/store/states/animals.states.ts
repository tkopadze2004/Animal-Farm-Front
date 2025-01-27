import { IAnimal } from '../../core/models/animals.model';

export interface IAnimalsState {
  animals?: IAnimal[];
  thanksCount?: number;
  loading: boolean;
  error: string | null;
}
