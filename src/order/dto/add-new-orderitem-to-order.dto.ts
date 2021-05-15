import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItem } from './order-item.dto';

export class AddNewItemToOrderDto {
  @ApiProperty({
    example: {
      menuItemId: 'e8f311bf-4687-451d-b55d-0d5c4b105acd',
      price: 10000,
      name: 'Mariela Okuneva',
      quantity: 2,
      orderItemToppings: [
        {
          menuItemToppingId: 'e8f311bf-4687-451d-b55d-0d5c4b105acd',
          name: 'Mariela Okuneva DDS 11',
          quantity: 1,
          price: 7000,
        },
        {
          menuItemToppingId: '17478751-c055-4111-9755-f5535e10b7a1',
          name: 'Mariela Okuneva DDS 22',
          quantity: 1,
          price: 3000,
        },
      ],
    },
    required: true,
  })
  @ValidateNested()
  @Type(() => OrderItem)
  sendItem: OrderItem;
}
