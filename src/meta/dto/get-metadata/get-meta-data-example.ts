import { RestaurantFilterType, RestaurantSortType } from 'src/restaurant/enums';
import { IMetaData } from './../../interfaces/meta-data.interface';
export const GetMetaDataExample: IMetaData = {
  deliveryService: {
    serviceStartTime: '7:00',
    serviceEndTime: '22:00',
    maxDeliverTime: 60,
    minDeliverTime: 30,
    averageTimePer1km: 10,
    deliverEstimateTime: {
      merchantTime: 15,
      stepTime: 5,
    },
    closeTimeWarning: 1800, // 30'
    callCenter: '0949 111 222',
    distanceLimit: 10000,
  },
  restaurantFilterType: [{ id: RestaurantFilterType.OPENING, name: 'Đang mở' }],
  restaurantSortType: [
    {
      id: RestaurantSortType.RATING,
      name: 'Đánh giá',
    },
  ],
  categories: [
    {
      id: 1,
      name: 'Đồ ăn',
      displayOrder: 1,
      iconUrl:
        'https://images.foody.vn/dcat/s270x270/image-dcat-b9833eb4-ea4f-4084-9bca-cbae5d703ce0.png',
    },
  ],
};
