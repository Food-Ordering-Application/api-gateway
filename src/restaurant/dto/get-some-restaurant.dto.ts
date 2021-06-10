import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  ValidateNested,
} from 'class-validator';
import { Position } from 'src/shared/dto/position.dto';
import { RestaurantFilterType, RestaurantSortType } from '../enums';

export class GetSomeRestaurantDto {
  @ApiProperty({ example: 2, required: true })
  @IsInt()
  page: number;

  @ApiProperty({ example: 25, required: true })
  @IsInt()
  @Max(25)
  size: number;

  @ApiProperty({ example: 5, required: true })
  @IsInt()
  cityId: number;

  @ApiProperty({ example: 'Ga', nullable: true })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({
    example: [1, 5],
    nullable: true,
  })
  @IsInt({ each: true })
  @IsOptional()
  categoryIds?: number[];

  @ApiProperty({
    example: [143, 144],
    nullable: true,
  })
  @IsInt({ each: true })
  @IsOptional()
  areaIds?: number[];

  @ApiProperty({
    example: {
      latitude: 10.7548816691903,
      longitude: 106.669695864843,
    },
  })
  @ValidateNested()
  @Type(() => Position)
  position?: Position;

  @ApiProperty({
    example: RestaurantSortType.NEARBY,
    enum: RestaurantSortType,
    type: 'number',
    required: false,
  })
  @IsEnum(RestaurantSortType)
  @IsInt()
  @IsOptional()
  sortId?: RestaurantSortType;

  @ApiProperty({
    example: [RestaurantFilterType.OPENING],
    enum: RestaurantFilterType,
    required: false,
  })
  @IsEnum(RestaurantFilterType, { each: true })
  @IsArray()
  @IsOptional()
  filterIds?: RestaurantFilterType[];
}
