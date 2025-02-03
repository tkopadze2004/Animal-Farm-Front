import { IPigStatus } from './pig.model';

export interface IAnimal {
  _id: string;
  name: string;
  foodType: string;
  type: string;
  thanksCount: number;
}

export interface IFeedAnimalRes {
  thanksCount: number;
  pigStatus: string | null;
  message: string | null;
  id?: string;
}
