import { ApiProperty } from '@nestjs/swagger';
import { IOrdersData } from '../interfaces';

export class GetAllRestaurantOrderResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Fetch orders of restaurant successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      orders: [
        {
          id: '20a173f3-2d22-46f6-9a2e-a82c600e1647',
          cashierId: 'a580e92d-5919-4b89-ba78-e81b6b7b2bf0',
          restaurantId: 'fef41594-94b8-469e-82c9-ea8b244693b9',
          itemDiscount: null,
          discount: null,
          subTotal: 80000,
          grandTotal: 120000,
          note: 'Xin dùm em thêm giá, hành',
          createdAt: '2021-05-30T07:44:55.735Z',
          updatedAt: '2021-05-30T08:20:46.507Z',
          status: 'CANCELLED',
          delivery: {
            id: '9259d7db-5946-4e0b-96dc-688d91a14a92',
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
            status: 'CANCELLED',
            issueNote: 'Test',
            issueType: 'ITEM_IS_OUT_OF_STOCK',
            createdAt: '2021-05-30T07:44:55.783Z',
            updatedAt: '2021-05-30T08:20:46.507Z',
            deliveredAt: null,
          },
          orderItems: [
            {
              id: 'c2e6de45-e3c6-492b-9f10-405b9fe77f0b',
              quantity: 2,
            },
          ],
        },
      ],
    },
    nullable: true,
  })
  data: IOrdersData;
}
