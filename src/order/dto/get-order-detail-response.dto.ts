import { ApiProperty } from '@nestjs/swagger';
import { IOrderData } from '../interfaces';

export class GetOrderDetailResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Order fetched successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      order: {
        id: '0f0fa5a9-519b-4efe-b3a4-52e951b75b21',
        cashierId: null,
        restaurantId: '46f096e9-a783-4566-9a68-2852f50b5bf4',
        itemDiscount: null,
        discount: null,
        total: 40000,
        createdAt: '2021-05-08T09:39:08.024Z',
        updatedAt: '2021-05-08T09:56:18.962Z',
        paymentType: 'COD',
        status: 'DRAFT',
        orderItems: [
          {
            id: 'a0475e9b-dd47-4509-b856-afb18a1a97ee',
            menuItemId: '3ebf6d98-a193-4fe9-8ef9-3bfd781089b3',
            price: 10000,
            quantity: 2,
            discount: 0,
            state: 'IN_STOCK',
            orderItemToppings: [
              {
                id: '500641b8-ee9a-4592-9e78-d7d9b8274ff4',
                menuItemToppingId: '19702968-1d66-4025-84ea-4f87a25e734b',
                quantity: 1,
                price: 7000,
                state: 'IN_STOCK',
              },
              {
                id: 'cea50982-6de4-4854-b176-282f625b8a46',
                menuItemToppingId: 'ee17f4b7-abc1-4d32-a1c2-38c688576ba6',
                quantity: 1,
                price: 3000,
                state: 'IN_STOCK',
              },
            ],
          },
        ],
        delivery: {
          id: '5fe17292-299e-4ca7-9dfb-a246afc77f07',
          customerId: '4ce66af8-84a9-4018-9427-98011e266959',
          driverId: null,
          address: null,
          geom: null,
          shippingFee: 15000,
          total: 55000,
          status: 'WAITING_DRIVER',
          createdAt: '2021-05-08T09:39:08.044Z',
          updatedAt: '2021-05-08T09:56:18.999Z',
          deliveredAt: null,
        },
      },
    },
    nullable: true,
  })
  data: IOrderData;
}
