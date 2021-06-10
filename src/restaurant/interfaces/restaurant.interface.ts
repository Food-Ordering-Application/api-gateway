import { ICategory } from 'src/user/merchant/restaurant/interfaces';

export interface IRestaurant {
  id: string;
  name: string;
  address: string;
  coverImageUrl: string;
  numRate: number;
  rating: number;
  position: { latitude: number; longitude: number };
  categories: ICategory[];
  isOpening: boolean;
  merchantIdInPayPal: string;
}
