import { ApiProperty } from '@nestjs/swagger';
import { IOrdersData } from '../../interfaces';

export class GetDraftOrdersOfCustomerResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Fetch draft orders of customer successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      orders: [
        {
          id: 'e0f751c8-1bb4-48c3-be07-2d8a8f2dab1c',
          cashierId: null,
          restaurantId: 'fef41594-94b8-469e-82c9-ea8b244693b9',
          itemDiscount: null,
          discount: null,
          subTotal: 80000,
          grandTotal: 120000,
          note: null,
          createdAt: '2021-05-31T05:16:50.188Z',
          updatedAt: '2021-05-31T05:16:50.188Z',
          status: 'DRAFT',
          delivery: {
            id: '9f62df57-b24d-4f50-8ebf-d47271f0c8e6',
            customerId: '849768fd-f8b8-4c50-be38-2fa34407e8bd',
            driverId: null,
            customerName: 'Phúc',
            customerPhoneNumber: '0123456789',
            customerAddress: '475A Điện Biên Phủ, Phường 25, Bình Thạnh',
            customerGeom: {
              type: 'Point',
              coordinates: [10.8019386669912, 106.714684816185],
            },
            restaurantName: 'Quán Ăn Maika',
            restaurantPhoneNumber: '0949657934',
            restaurantAddress: '528 Nguyễn Trãi, P. 8, Quận 5, TP. HCM',
            restaurantGeom: {
              type: 'Point',
              coordinates: [10.7548816691903, 106.669695864843],
            },
            distance: 7178,
            shippingFee: 40000,
            status: 'DRAFT',
            issueNote: null,
            issueType: null,
            createdAt: '2021-05-31T05:16:50.203Z',
            updatedAt: '2021-05-31T05:16:50.203Z',
            orderTime: '2021-05-31T05:16:50.203Z',
            deliveredAt: null,
            expectedDeliveryTime: null,
          },
          invoice: null,
        },
        {
          id: '2094563a-1058-4c49-b6dc-749852aef1ae',
          cashierId: null,
          restaurantId: 'fef41594-94b8-469e-82c9-ea8b244693b9',
          itemDiscount: null,
          discount: null,
          subTotal: 80000,
          grandTotal: 120000,
          note: null,
          createdAt: '2021-05-31T05:14:59.242Z',
          updatedAt: '2021-05-31T05:14:59.242Z',
          status: 'DRAFT',
          delivery: {
            id: '71ceeb92-47a4-4805-a8e8-313d7a445580',
            customerId: '849768fd-f8b8-4c50-be38-2fa34407e8bd',
            driverId: null,
            customerName: 'Phúc',
            customerPhoneNumber: '0123456789',
            customerAddress: '475A Điện Biên Phủ, Phường 25, Bình Thạnh',
            customerGeom: {
              type: 'Point',
              coordinates: [10.8019386669912, 106.714684816185],
            },
            restaurantName: 'Quán Ăn Maika',
            restaurantPhoneNumber: '0949657934',
            restaurantAddress: '528 Nguyễn Trãi, P. 8, Quận 5, TP. HCM',
            restaurantGeom: {
              type: 'Point',
              coordinates: [10.7548816691903, 106.669695864843],
            },
            distance: 7178,
            shippingFee: 40000,
            status: 'DRAFT',
            issueNote: null,
            issueType: null,
            createdAt: '2021-05-31T05:14:59.275Z',
            updatedAt: '2021-05-31T05:14:59.275Z',
            orderTime: '2021-05-31T05:14:59.275Z',
            deliveredAt: null,
            expectedDeliveryTime: null,
          },
          invoice: null,
        },
      ],
    },
    nullable: true,
  })
  data: IOrdersData;
}
