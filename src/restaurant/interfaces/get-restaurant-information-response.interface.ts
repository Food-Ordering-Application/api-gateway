import { IRestaurantDetail } from '.';
export interface IRestaurantResponse {
  status: number;
  message: string;
  data: {
    restaurant: IRestaurantDetail | null;
  };
}
