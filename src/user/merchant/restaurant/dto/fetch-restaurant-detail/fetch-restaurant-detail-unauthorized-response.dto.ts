import { ApiProperty } from '@nestjs/swagger';
import { IFetchRestaurantDetailData } from '../../interfaces';

export class FetchRestaurantDetailOfMerchantUnauthorizedResponseDto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized', type: 'string' })
  message: string;
  @ApiProperty({
    example: null,
    nullable: true,
  })
  data: IFetchRestaurantDetailData;
}
