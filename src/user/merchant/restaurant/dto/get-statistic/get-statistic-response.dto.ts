import { ApiProperty } from '@nestjs/swagger';
import { IGetRestaurantStatisticData } from '../../interfaces/get-restaurant-statistic-data.interface';

export class GetRestaurantStatisticResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Get restaurant statistic successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {},
    nullable: true,
  })
  data: IGetRestaurantStatisticData;
}
