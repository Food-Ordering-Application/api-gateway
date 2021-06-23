import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetRevenueInsightOfRestaurantDto {
  @ApiProperty({
    example: '2021-06-01',
    description: 'ISO-8601 date string format',
    required: true,
  })
  @IsString()
  from: string;

  @ApiProperty({
    example: '2021-06-30',
    description: 'ISO-8601 date string format',
    required: true,
  })
  @IsString()
  to: string;
}
