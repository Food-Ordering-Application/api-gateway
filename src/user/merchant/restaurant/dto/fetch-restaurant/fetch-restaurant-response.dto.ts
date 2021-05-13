import { ApiProperty } from '@nestjs/swagger';
import { IFetchRestaurantData } from '../../interfaces/fetch-restaurant-data.interface';
import { RestaurantsExample } from './fetch-restaurant-response.example';

export class FetchRestaurantsOfMerchantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Fetched restaurants successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      results: RestaurantsExample,
      size: 10,
      total: 1,
    },
    nullable: true,
  })
  data: IFetchRestaurantData;
}
