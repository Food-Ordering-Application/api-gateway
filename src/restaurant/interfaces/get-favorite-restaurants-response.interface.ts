import { IRestaurant } from './';

export interface IGetFavoriteRestaurantsResponse {
  status: number;
  message: string;
  data: {
    restaurants: IRestaurant[];
  };
}
