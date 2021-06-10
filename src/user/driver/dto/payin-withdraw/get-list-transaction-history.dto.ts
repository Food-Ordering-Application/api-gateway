import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Max,
} from 'class-validator';
import {
  EGeneralTransactionStatus,
  EGetListDriverTransactionHistory,
} from '../../enums';

export class GetListDriverTransactionHistoryDto {
  @ApiProperty({
    example: EGetListDriverTransactionHistory.ALL,
    enum: EGetListDriverTransactionHistory,
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
    example: EGeneralTransactionStatus.ALL,
    enum: EGeneralTransactionStatus,
  })
  @IsString()
  @IsOptional()
  transactionStatus: string;

  @ApiProperty({
    example: '2021-06-22',
    description: 'ISO-8601 date string format',
  })
  @IsString()
  @IsOptional()
  from: string;

  @ApiProperty({
    example: '2021-06-22',
    description: 'ISO-8601 date string format',
  })
  @IsString()
  @IsOptional()
  to: string;
}
