import { ApiProperty } from '@nestjs/swagger';
import { IRestaurantsData } from '../interfaces/multiple-restaurant-data.interface';

export class GetSomeRestaurantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Restaurant fetched successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      restaurants: [
        {
          id: 'fef41594-94b8-469e-82c9-ea8b244693b9',
          name: 'Quán Ăn Maika',
          coverImageUrl: 'http://lorempixel.com/640/480',
          numRate: 40,
          rating: 4.3,
          address: '528 Nguyễn Trãi, P. 8, Quận 5, TP. HCM',
          merchantIdInPayPal: 'DD64LQSRDC2UN',
          position: {
            latitude: 10.7548816691903,
            longitude: 106.669695864843,
          },
          isOpening: true,
        },
      ],
    },
    nullable: true,
  })
  data: IRestaurantsData;
}
