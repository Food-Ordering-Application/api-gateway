import { IOpenHour, ICategory } from '.';

export interface IRestaurantDetail {
  id: string;
  name: string;
  phone: string;
  coverImageUrl: string;
  videoUrl: string;
  numRate: number;
  rating: number;
  address: string;
  cityId: number;
  city: string;
  areaId: number;
  area: string;
  position: {
    latitude: number;
    longitude: number;
  };
  isFavorite: boolean;
  openHours?: IOpenHour[];
  categories?: ICategory[];
  isOpening: boolean;
  merchantIdInPayPal: string;
}
