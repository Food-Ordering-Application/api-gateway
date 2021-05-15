import { IRestaurantProfile } from './restaurant-profile.interface';
export interface IUserServiceFetchRestaurantProfilesResponse {
  status: number;
  message: string;
  data: {
    results: IRestaurantProfile[];
    total: number;
    size: number;
  };
}
