import { IFetchPaymentData } from '.';

export interface IUserServiceFetchPaymentOfRestaurantResponse {
  status: number;
  message: string;
  data: IFetchPaymentData;
}
