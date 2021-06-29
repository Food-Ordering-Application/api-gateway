import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNumberString,
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
  @IsNumberString()
  page: string;

  @ApiProperty({ example: 25, required: true })
  @IsNumberString()
  size: string;

  @ApiProperty({
    example: '2013-11-18',
    description: 'ISO-8601 date string format',
  })
  @IsString()
  @IsOptional()
  from: string;

  @ApiProperty({
    example: '2013-11-19',
    description: 'ISO-8601 date string format',
  })
  @IsString()
  @IsOptional()
  to: string;
}
