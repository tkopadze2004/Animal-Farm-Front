import { IAnimal } from '../../core/models/animals.model';

export interface IAnimalsState {
  animals: IAnimal[];
  loading: boolean;
  error: string | null;
}
