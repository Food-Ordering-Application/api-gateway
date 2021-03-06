import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { EGetListDriverAccountTransaction } from '../../enums';

export class GetListAccountTransactionDriverDto {
  @ApiProperty({
    example: EGetListDriverAccountTransaction.ALL,
    enum: EGetListDriverAccountTransaction,
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
