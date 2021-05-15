import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItem } from './order-item.dto';

export class CreateOrderDto {
  @ApiProperty({
    example: {
      menuItemId: 'e8f311bf-4687-451d-b55d-0d5c4b105acd',
      quantity: 2,
      orderItemToppings: [
        {
          menuItemToppingId: 'e8f311bf-4687-451d-b55d-0d5c4b105acd',
          quantity: 1,
        },
        {
          menuItemToppingId: '17478751-c055-4111-9755-f5535e10b7a1',
          quantity: 1,
        },
      ],
    },
    required: true,
  })
  @ValidateNested()
  @Type(() => OrderItem)
  orderItem: OrderItem;

  @ApiProperty({
    example: '50e26c95-383b-4cb2-a97c-1547433c6d3a',
    required: true,
  })
  @IsString()
  restaurantId: string;

  @ApiProperty({
    example: '6c94e9b7-aa4f-44c8-bf21-91dd1da2dc2d',
    nullable: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  customerId: string;

  @ApiProperty({
    example: '6c94e9b7-aa4f-44c8-bf21-91dd1da2dc2d',
    nullable: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  cashierId: string;
}
