import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItem } from './order-item.dto';

export class AddNewItemToOrderDto {
  @ApiProperty({
    example: {
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
    required: true,
  })
  @ValidateNested()
  @Type(() => OrderItem)
  sendItem: OrderItem;
}
