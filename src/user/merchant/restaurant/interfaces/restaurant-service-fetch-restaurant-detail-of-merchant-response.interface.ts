import { IFetchRestaurantDetailData } from '.';

export interface IRestaurantServiceFetchRestaurantDetailOfMerchantResponse {
  status: number;
  message: string;
  data: IFetchRestaurantDetailData;
}
