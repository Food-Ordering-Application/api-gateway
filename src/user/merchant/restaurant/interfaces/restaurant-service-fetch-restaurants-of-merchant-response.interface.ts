import { IFetchRestaurantData } from '.';

export interface IRestaurantServiceFetchRestaurantsOfMerchantResponse {
  status: number;
  message: string;
  data: IFetchRestaurantData;
}
