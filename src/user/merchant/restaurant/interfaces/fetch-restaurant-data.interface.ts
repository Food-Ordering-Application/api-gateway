import { IRestaurant } from '.';

export interface IFetchRestaurantData {
  results: IRestaurant[];
  total: number;
  size: number;
}
