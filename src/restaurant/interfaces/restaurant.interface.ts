import { CategoryType } from './../../shared/enum/category-type.enum';
export interface IRestaurant {
  id: string;
  name: string;
  address: string;
  coverImageUrl: string;
  numRate: number;
  rating: number;
  categories: CategoryType[];
  merchantIdInPayPal: string;
}
