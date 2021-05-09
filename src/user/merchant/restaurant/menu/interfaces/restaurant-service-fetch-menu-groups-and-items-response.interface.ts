import { IFetchMenuGroupsAndItemsData } from '.';
export interface IRestaurantServiceFetchMenuGroupsAndItemsResponse {
  status: number;
  message: string;
  data: IFetchMenuGroupsAndItemsData;
}
