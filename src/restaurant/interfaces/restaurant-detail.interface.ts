import { IOpenHour } from '.';
import { CategoryType } from '../../shared/enum/category-type.enum';

export interface IRestaurantDetail {
  id: string;
  name: string;
  phone: string;
  coverImageUrl: string;
  videoUrl: string;
  numRate: number;
  rating: number;
  address: string;
  city: string;
  area: string;
  geo: {
    latitude: number;
    longitude: number;
  };
  openHours?: IOpenHour[];
  categories?: CategoryType[];
  merchantIdInPayPal: string;
}
