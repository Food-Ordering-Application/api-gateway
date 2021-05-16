import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItem } from './index';

export class CreateOrderDto {
  @ApiProperty({
    example: {
      orderItem: {
        menuItemId: '819fa0b6-7d12-46f5-8635-d2d9ed9ad12c',
        quantity: 2,
        orderItemToppings: [
          {
            toppingItemId: '819fa0b6-7d12-46f5-8635-d2d9ed9ad12c',
            quantity: 1,
          },
          {
            toppingItemId: '5b24b40f-4899-420d-bd12-49be44d95eef',
            quantity: 1,
          },
        ],
      },
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
