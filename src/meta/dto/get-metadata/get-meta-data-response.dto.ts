import { ApiProperty } from '@nestjs/swagger';
import { RestaurantFilterType, RestaurantSortType } from 'src/restaurant/enums';
import { ICategory } from 'src/restaurant/interfaces';

export class GetMetaDataResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Fetched meta data successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
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
      restaurantFilterType: [
        { id: RestaurantFilterType.OPENING, name: 'Đang mở' },
        { id: RestaurantFilterType.PROMOTION, name: 'Ưu đãi' },
      ],
      restaurantSortType: [
        {
          id: RestaurantSortType.NEARBY,
          name: 'Gần đây',
        },
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
    },
  })
  data: {
    deliveryService: {
      // thoi gian cho phep giao hang
      serviceStartTime: string;
      serviceEndTime: string;
      // thoi gian giao hang toi da
      maxDeliverTime: number;
      minDeliverTime: number;
      averageTimePer1km: number;
      // thoi gian giao hang du kien =
      // max(thoi gian chuan bi, thoi gian shipper toi cua hang) +
      // thoi gian di chuyen cua shipper (average_time_per_1km * distance)
      deliverEstimateTime: {
        merchantTime: number; // thoi gian chuan bi cua nha hang
        stepTime: number;
      };
      closeTimeWarning: 1800; // 30' truoc gio dong
      callCenter: string;
      distanceLimit: 10000; // gioi han dat 10km
    };
    categories: ICategory[];
    restaurantFilterType: {
      name: 'Đang mở' | 'Ưu đãi';
      id: RestaurantFilterType;
    }[];
    restaurantSortType: {
      name: 'Gần đây' | 'Đánh giá';
      id: RestaurantSortType;
    }[];
  };
}
