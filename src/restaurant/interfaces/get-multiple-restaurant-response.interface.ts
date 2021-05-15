import { IRestaurant } from './';

export interface IRestaurantsResponse {
  status: number;
  message: string;
  data: {
    restaurants: IRestaurant[];
  };
}
