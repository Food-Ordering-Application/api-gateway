import { ApiProperty } from '@nestjs/swagger';
import { IFetchRestaurantDetailData } from '../../interfaces';
import { RestaurantDetailExample } from './fetch-restaurant-detail-response.example';

export class FetchRestaurantDetailOfMerchantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Fetched restaurant detail successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      restaurant: RestaurantDetailExample,
    },
    nullable: true,
  })
  data: IFetchRestaurantDetailData;
}
