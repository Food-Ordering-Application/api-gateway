import { IRestaurant } from './index';

export interface IMenu {
  id: string;
  restaurant?: IRestaurant;
  name?: string;
  index?: number;
  isActive?: boolean;
}
