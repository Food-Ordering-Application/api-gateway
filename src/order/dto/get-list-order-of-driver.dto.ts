import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Max,
} from 'class-validator';
import { EDriverOrderType } from '../enums';

export class GetListOrderOfDriverDto {
  @ApiProperty({
    example: EDriverOrderType.ACTIVE,
    enum: EDriverOrderType,
    required: true,
  })
  @IsString()
  query: string;

  @ApiProperty({ example: 2, required: true })
  @IsString()
  page: string;

  @ApiProperty({ example: 25, required: true })
  @IsString()
  size: string;

  @ApiProperty({
    example: '2021-06-02T17:15:33.558Z',
    description: 'ISO-8601 date string format',
  })
  @IsDateString()
  @IsOptional()
  from: Date;

  @ApiProperty({
    example: '2021-06-02T17:15:33.558Z',
    description: 'ISO-8601 date string format',
  })
  @IsDateString()
  @IsOptional()
  to: Date;
}
