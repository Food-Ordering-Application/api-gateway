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
        restaurantId: '76471160-2c3e-412e-85a7-4ab087306509',
        paymentType: 'COD',
        status: 'DRAFT',
        orderItems: [
          {
            menuItemId: '7f953dbc-2484-4560-9834-fe93ab92d810',
            price: 12110,
            quantity: 2,
            name: 'Nina Padberg',
            subTotal: 12110,
            discount: 0,
            id: 'ae81dddd-fa87-44f8-a2b5-f13fbe581946',
            state: 'IN_STOCK',
          },
        ],
        subTotal: 24220,
        grandTotal: 79220,
        cashierId: null,
        itemDiscount: null,
        discount: null,
        note: null,
        id: '1d839efe-c0c4-410d-942f-eadb21342b89',
        createdAt: '2021-05-16T13:24:08.339Z',
        updatedAt: '2021-05-16T13:24:08.339Z',
        delivery: {
          customerId: '07995ee3-ca14-4c20-be90-00cacd3c848a',
          status: 'DRAFT',
          restaurantGeom: {
            type: 'Point',
            coordinates: [10.7380495, 106.6788235],
          },
          restaurantAddress: '44486 Bernadine Parkway',
          customerGeom: {
            type: 'Point',
            coordinates: [10.6796076, 106.7497249],
          },
          customerAddress:
            '2581/13 Huỳnh Tấn Phát, Phú Xuân, Nhà Bè, Thành phố Hồ Chí Minh',
          shippingFee: 55000,
          distance: 10302,
          driverId: null,
          deliveredAt: null,
          id: '2bfcb500-35f2-47f8-b1e9-b955682e9471',
          createdAt: '2021-05-16T13:24:08.351Z',
          updatedAt: '2021-05-16T13:24:08.351Z',
        },
      },
    },
    nullable: true,
  })
  data: IOrderData;
}
