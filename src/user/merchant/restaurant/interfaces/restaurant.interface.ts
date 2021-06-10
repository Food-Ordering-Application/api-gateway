import { ICategory, IOpenHour } from '.';

export interface IRestaurant {
  id: string;
  name: string;
  phone: string;
  owner: string;
  coverImageUrl: string;
  videoUrl?: string;
  verifiedImageUrl?: string;
  position: {
    latitude: number;
    longitude: number;
  };
  openHours?: IOpenHour[];
  categories?: ICategory[];
  address: string;
  city: string;
  cityId: number;
  area: string;
  areaId: number;
  isActive: boolean;
  isVerified: boolean;
  isBanned: boolean;
}
