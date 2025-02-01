import { IAnimal } from '../../core/models/animals.model';
import { IBaseState } from '../../shared/models/base/base.state.model';

export interface IAnimalsState extends IBaseState {
  animals: IAnimal[];
  thanksCount: number;
  pigStatus: string | null;
  message: string | null;
  loadingAnimalId: string | null;
}
