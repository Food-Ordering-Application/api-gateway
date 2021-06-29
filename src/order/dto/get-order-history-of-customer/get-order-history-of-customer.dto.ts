import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsEnum,
  IsDateString,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { OrderHistoryFilter } from 'src/order/enums';
export class GetOrderHistoryOfCustomerDto {
  @ApiProperty({
    example: OrderHistoryFilter.COMPLETED,
    enum: OrderHistoryFilter,
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(OrderHistoryFilter)
  filter: OrderHistoryFilter;

  @ApiProperty({
    example: '2013-11-18',
    description: 'ISO-8601 date string format',
    required: true,
  })
  @IsString()
  from: string;

  @ApiProperty({
    example: '2013-11-18',
    description: 'ISO-8601 date string format',
    required: true,
  })
  @IsString()
  to: string;
}
