import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { GetRestaurantOrder } from '../enums';

export class GetAllRestaurantOrderDto {
  @ApiProperty({
    example: '6c94e9b7-aa4f-44c8-bf21-91dd1da2dc2d',
    required: true,
  })
  @IsString()
  restaurantId: string;

  @ApiProperty({
    example: GetRestaurantOrder.ALL,
    enum: GetRestaurantOrder,
    required: true,
  })
  @IsString()
  query: string;

  @ApiProperty({
    example: 2,
    required: true,
  })
  @IsNumber()
  pageNumber: number;
}
