import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsNumber, IsOptional } from 'class-validator';
import { MenuInsightSortBy } from './menu-insight-sort-by.enum';

export class GetMenuInsightOfRestaurantDto {
  @ApiProperty({
    example: '2021-06-01',
    description: 'ISO-8601 date string format',
    required: true,
  })
  @IsString()
  @IsOptional()
  from: string;

  @ApiProperty({
    example: '2021-06-30',
    description: 'ISO-8601 date string format',
    required: true,
  })
  @IsString()
  @IsOptional()
  to: string;

  @ApiProperty({
    example: MenuInsightSortBy.totalOrder,
    enum: MenuInsightSortBy,
    required: false,
    nullable: false,
  })
  @IsEnum(MenuInsightSortBy)
  sortBy: MenuInsightSortBy;

  @ApiProperty({
    example: 5,
    required: true,
  })
  @IsNumber()
  limit: number;
}
