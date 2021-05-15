import { ICategory, IOpenHour } from '.';

export interface IRestaurant {
  id: string;
  name: string;
  phone: string;
  owner: string;
  coverImageUrl: string;
  videoUrl?: string;
  verifiedImageUrl?: string;
  geo: {
    latitude: number;
    longitude: number;
  };
  openHours?: IOpenHour[];
  categories?: ICategory[];
  address: string;
  city: string;
  area: string;
  isActive: boolean;
  isVerified: boolean;
  isBanned: boolean;
}
