import { ApiProperty } from '@nestjs/swagger';
import { IOrderData } from '../interfaces';

export class GetOrderAssociatedWithCusAndResResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Draft order fetched successfully', type: 'string' })
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
        updatedAt: '2021-05-08T09:39:08.024Z',
        status: 'DRAFT',
        delivery: {
          id: 'b42e5f64-bb12-42f0-bf3c-ce7975ff0c76',
          customerId: 'da552594-d925-4311-ab2f-303d26abdae1',
          driverId: null,
          customerName: 'Phúc',
          customerPhoneNumber: '0123456789',
          customerAddress: null,
          customerGeom: null,
          restaurantName: 'Quán Ăn Maika',
          restaurantPhoneNumber: '0949657934',
          restaurantAddress: '629 Ray Lane',
          restaurantGeom: {
            type: 'Point',
            coordinates: [10.7566764, 106.6626456],
          },
          distance: null,
          shippingFee: 15000,
          status: 'DRAFT',
          createdAt: '2021-05-12T14:52:57.363Z',
          updatedAt: '2021-05-12T14:52:57.363Z',
          deliveredAt: null,
        },
        orderItems: [
          {
            id: '21c44666-fa3b-44f6-bddf-daed93fc95da',
            menuItemId: '3ebf6d98-a193-4fe9-8ef9-3bfd781089b3',
            price: 10000,
            quantity: 2,
            discount: 0,
            state: 'IN_STOCK',
            orderItemToppings: [
              {
                id: '387442d1-88a9-4497-a860-f240f8b5998b',
                menuItemToppingId: '19702968-1d66-4025-84ea-4f87a25e734b',
                quantity: 1,
                price: 7000,
                state: 'IN_STOCK',
              },
              {
                id: '3a3f446a-ce27-47ad-a84e-2fcc58851fbc',
                menuItemToppingId: 'ee17f4b7-abc1-4d32-a1c2-38c688576ba6',
                quantity: 1,
                price: 3000,
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
