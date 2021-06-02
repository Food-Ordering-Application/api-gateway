import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsDateString, IsNotEmpty } from 'class-validator';
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
