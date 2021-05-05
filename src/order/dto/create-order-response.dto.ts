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
        id: 'b2e2aedf-b462-48a0-96eb-fb4b9b1eabf5',
        cashierId: '65b3d228-9983-4d90-8b49-48fea6faad33',
        restaurantId: '42b785d2-5e44-44d0-a2cb-372125a46e60',
        subTotal: 74000,
        itemDiscount: null,
        serviceFee: 2000,
        discount: null,
        grandTotal: 76000,
        createdAt: '2021-05-05T06:12:02.579Z',
        updatedAt: '2021-05-05T06:13:58.277Z',
        paymentType: 'COD',
        status: 'DRAFT',
        orderItems: [
          {
            id: 'dd8e0ef7-22da-42ca-9743-5808036b8128',
            menuItemId: '532c749a-d526-4ceb-bd53-672fa45d4bf9',
            price: 10000,
            quantity: 2,
            discount: 0,
            state: 'IN_STOCK',
            orderItemToppings: [
              {
                id: '1071a332-6b37-4e99-81c9-036741f3dd43',
                menuItemToppingId: '1d0abafd-d389-4423-975f-1124fa06fe40',
                quantity: 1,
                price: 7000,
                state: 'IN_STOCK',
              },
              {
                id: '3b0311f1-8261-4e67-8ecc-5a4202432a12',
                menuItemToppingId: '9ca91068-49f2-4a8b-895a-ad4999e83584',
                quantity: 1,
                price: 3000,
                state: 'IN_STOCK',
              },
            ],
          },
          {
            menuItemId: '532c749a-d526-4ceb-bd53-672fa45d4bf9',
            price: 10000,
            quantity: 2,
            orderItemToppings: [
              {
                menuItemToppingId: '1d0abafd-d389-4423-975f-1124fa06fe40',
                price: 7000,
                quantity: 1,
                state: 'IN_STOCK',
                id: 'd65fb07c-cdcf-4e73-8123-098727a4a9a6',
              },
            ],
            discount: 0,
            id: '7251c4a6-f025-45c0-9a52-320c5d369f59',
            state: 'IN_STOCK',
          },
        ],
        delivery: null,
      },
    },
    nullable: true,
  })
  data: IOrderData;
}
