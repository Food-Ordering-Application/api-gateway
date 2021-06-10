import { IRestaurant } from '../../interfaces';

export const RestaurantsExample: IRestaurant[] = [
  {
    id: 'fef41594-94b8-469e-82c9-ea8b244693b9',
    name: 'Quán Ăn Maika',
    owner: 'f40b99fd-3224-449c-82a7-8e3ea514d535',
    coverImageUrl: 'http://lorempixel.com/640/480',
    address: '528 Nguyễn Trãi, P. 8, Quận 5, TP. HCM',
    cityId: 5,
    city: 'Hồ Chí Minh',
    areaId: 143,
    area: 'Quận 5',
    phone: '0949657934',
    position: {
      latitude: 3.253,
      longitude: -12.7589,
    },
    isActive: true,
    isVerified: false,
    isBanned: false,
  },
];
