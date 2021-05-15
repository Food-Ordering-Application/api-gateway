import { IFetchMenuItemToppingsOfCurrentToppingItemData } from '.';

export interface IRestaurantServiceFetchMenuItemToppingsOfCurrentToppingItemResponse {
  status: number;
  message: string;
  data: IFetchMenuItemToppingsOfCurrentToppingItemData;
}
