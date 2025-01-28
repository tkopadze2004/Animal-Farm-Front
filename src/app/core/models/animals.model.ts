export interface IAnimal {
  _id: string;
  name: string;
  foodType: string;
  type: string;
  thanksCount: number;
}

export interface IFeedAnimalRes {
  thanksCount: number;
  pigStatus:string
}
