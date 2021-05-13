export interface IRestaurant {
  id: string;
  name: string;
  phone: string;
  owner: string;
  coverImageUrl: string;
  videoUrl?: string;
  geo: {
    latitude: number;
    longitude: number;
  };
  address: string;
  city: string;
  area: string;
  isActive: boolean;
  isVerified: boolean;
  isBanned: boolean;
}
