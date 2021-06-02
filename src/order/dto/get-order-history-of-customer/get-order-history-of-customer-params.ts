import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { OrderHistoryFilter } from 'src/order/enums';
import { PaginationParams } from '../../../shared/types/pagination-params';
export class GetOrderHistoryOfCustomerParams extends PaginationParams {
  @ApiProperty({
    example: OrderHistoryFilter.COMPLETED,
    enum: OrderHistoryFilter,
    required: false,
    nullable: true,
    default: null,
  })
  @IsOptional()
  @IsEnum(OrderHistoryFilter)
  filter: OrderHistoryFilter;

  @ApiProperty({
    example: '2021-06-02T17:15:33.558Z',
    description: 'ISO-8601 date string format',
    required: true,
  })
  @IsDateString()
  from: Date;

  @ApiProperty({
    example: '2021-06-02T17:15:33.558Z',
    description: 'ISO-8601 date string format',
    required: true,
  })
  @IsDateString()
  to: Date;
}
