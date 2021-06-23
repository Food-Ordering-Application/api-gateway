import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { GroupByInterval } from './group-by-interval.enum';

export class GetOrderStatisticsOfRestaurantDto {
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

  @ApiProperty({
    example: GroupByInterval.WEEK,
    enum: GroupByInterval,
    required: false,
    nullable: false,
  })
  @IsEnum(GroupByInterval)
  groupByInterval: GroupByInterval;
}
