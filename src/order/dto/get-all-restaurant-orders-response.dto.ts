import { ApiProperty } from '@nestjs/swagger';
import { IOrdersData } from '../interfaces';

export class GetAllRestaurantOrderResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Restaurant orders fetched successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      orders: [
        {
          id: '77eb67c6-9274-4064-9133-6922d51cdef5',
          cashierId: '97604702-3f96-4db4-b6e2-fdee055a1687',
          restaurantId: 'f1db260f-b2fa-4862-9041-2a7d3b481733',
          itemDiscount: 205852,
          discount: 4740,
          total: null,
          createdAt: '2021-12-08T04:45:56.647Z',
          updatedAt: '2021-05-08T06:58:45.318Z',
          paymentType: 'COD',
          status: 'ORDERED',
          delivery: {
            id: 'b47cb910-5540-4738-813a-6ee312c8308b',
            customerId: 'dd2ccbac-b52a-4580-9d1f-6aae8a9cd69a',
            driverId: 'a509cd01-c1f2-45c4-9c28-f025f17f5d75',
            address: '0255 Hagenes Springs Apt. 609',
            geom: {
              type: 'Point',
              coordinates: [50.0314, 31.2022],
            },
            shippingFee: 7486,
            total: 46651,
            status: 'CANCELLED',
            createdAt: '2021-05-08T06:58:46.051Z',
            updatedAt: '2021-05-08T06:58:46.051Z',
            deliveredAt: '2022-02-24T17:54:42.302Z',
          },
        },
        {
          id: '0bde29e9-97a4-4ad2-8822-c5a847cbc11b',
          cashierId: '40afa2f5-03c6-46cc-add9-cc8beeddab8f',
          restaurantId: 'f1db260f-b2fa-4862-9041-2a7d3b481733',
          itemDiscount: 118668,
          discount: 5473,
          total: null,
          createdAt: '2021-12-08T04:45:56.647Z',
          updatedAt: '2021-05-08T06:58:45.382Z',
          paymentType: 'COD',
          status: 'ORDERED',
          delivery: {
            id: '5f6c3464-24c8-487b-b447-2eaff3ba93b6',
            customerId: 'aada03e6-24e2-40b2-a7f2-e816bb50cc79',
            driverId: '8fa1d61a-af04-4014-aac9-3b8641c366e1',
            address: '34929 Boyer Fort Suite 321',
            geom: {
              type: 'Point',
              coordinates: [-59.6994, -72.9788],
            },
            shippingFee: 9586,
            total: 80204,
            status: 'PICKING',
            createdAt: '2021-05-08T06:58:46.101Z',
            updatedAt: '2021-05-08T06:58:46.101Z',
            deliveredAt: '2022-03-19T08:58:42.949Z',
          },
        },
      ],
    },
    nullable: true,
  })
  data: IOrdersData;
}
