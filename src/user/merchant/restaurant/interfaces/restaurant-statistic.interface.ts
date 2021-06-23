import { INumOrderAreaStatistic } from './num-order-area-statistic.interface';

export interface IRestaurantStatistic {
  cityId: string;
  name: string;
  areas: INumOrderAreaStatistic[];
}
