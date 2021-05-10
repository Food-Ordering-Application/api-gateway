import { ApiProperty } from '@nestjs/swagger';
import { IOrderData } from '../interfaces';

export class IncreaseOrderItemQuantityResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Increase orderItem quantity successfully',
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
        total: 80000,
        createdAt: '2021-05-08T09:39:08.024Z',
        updatedAt: '2021-05-08T09:49:59.704Z',
        paymentType: 'COD',
        status: 'DRAFT',
        delivery: {
          id: '5fe17292-299e-4ca7-9dfb-a246afc77f07',
          customerId: '4ce66af8-84a9-4018-9427-98011e266959',
          driverId: null,
          address: null,
          geom: null,
          shippingFee: 15000,
          total: 95000,
          status: 'WAITING_DRIVER',
          createdAt: '2021-05-08T09:39:08.044Z',
          updatedAt: '2021-05-08T09:49:59.691Z',
          deliveredAt: null,
        },
        orderItems: [
          {
            id: 'c47357c2-345b-49a9-9afc-588a22ba01f6',
            menuItemId: '3ebf6d98-a193-4fe9-8ef9-3bfd781089b3',
            price: 13000,
            quantity: 4,
            discount: 0,
            state: 'IN_STOCK',
            orderItemToppings: [
              {
                id: 'f02fddea-4054-4a7b-87cb-110d72a347f0',
                menuItemToppingId: '19702968-1d66-4025-84ea-4f87a25e734b',
                quantity: 1,
                price: 7000,
                state: 'IN_STOCK',
              },
            ],
          },
        ],
      },
    },
    nullable: true,
  })
  data: IOrderData;
}
