import { ApiProperty } from '@nestjs/swagger';
import { IOrdersData } from '../interfaces';

export class GetAllRestaurantOrderResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Restaurant orders fetched successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {},
    nullable: true,
  })
  data: IOrdersData;
}
