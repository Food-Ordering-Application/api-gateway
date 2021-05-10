import { ApiProperty } from '@nestjs/swagger';
import { IOrderData } from '../interfaces';

export class CreateOrderResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({ example: 'Order created successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      order: {
        restaurantId: '52d51bba-7edb-4efc-8036-6ea73597a4ef',
        paymentType: 'COD',
        status: 'DRAFT',
        orderItems: [
          {
            menuItemId: '7ba20680-9406-4cf2-b068-0b199154c7bf',
            price: 10000,
            quantity: 2,
            orderItemToppings: [
              {
                menuItemToppingId: 'ea4b155c-09e4-4df0-a434-30dc900e6fb3',
                price: 7000,
                quantity: 1,
                state: 'IN_STOCK',
                id: '53c5cbb6-bfe2-4100-b152-f97804436648',
              },
              {
                menuItemToppingId: '1114c8c5-79b5-4263-99d0-d67958b664fc',
                price: 3000,
                quantity: 1,
                state: 'IN_STOCK',
                id: '1407c948-39d2-4b49-9eb2-1ed04c0dba7a',
              },
            ],
            discount: 0,
            id: 'b1bed5bd-08b0-462f-b6d4-99ca4864a652',
            state: 'IN_STOCK',
          },
        ],
        total: 40000,
        cashierId: null,
        itemDiscount: null,
        discount: null,
        id: '05ecd416-fa20-447f-8c4e-5250e9173e3d',
        createdAt: '2021-05-08T09:34:25.053Z',
        updatedAt: '2021-05-08T09:34:25.053Z',
      },
    },
    nullable: true,
  })
  data: IOrderData;
}
