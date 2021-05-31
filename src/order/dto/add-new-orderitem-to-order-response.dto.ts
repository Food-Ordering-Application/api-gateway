import { ApiProperty } from '@nestjs/swagger';
import { IOrderData } from '../interfaces';

export class AddNewItemToOrderResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'New orderItem added successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      order: {
        restaurantId: 'fef41594-94b8-469e-82c9-ea8b244693b9',
        status: 'DRAFT',
        orderItems: [
          {
            menuItemId: 'e82c236b-f27e-4e09-b089-9542674e4ea7',
            price: 40000,
            quantity: 2,
            name: 'Mì cay',
            orderItemToppings: [
              {
                toppingItemId: '5eac3acf-dd82-4781-9752-ecf2c0b126cf',
                price: null,
                quantity: 1,
                name: 'Nước sốt Thái',
                state: 'IN_STOCK',
                id: '09e114b9-8c96-4d58-85a5-b6ea677ea8ac',
              },
            ],
            subTotal: 40000,
            orderId: 'e0f751c8-1bb4-48c3-be07-2d8a8f2dab1c',
            discount: 0,
            id: '7e344197-769b-4ed7-b8fc-ed324f8206b5',
            state: 'IN_STOCK',
          },
        ],
        subTotal: 80000,
        delivery: {
          status: 'DRAFT',
          customerId: '849768fd-f8b8-4c50-be38-2fa34407e8bd',
          customerName: 'Phúc',
          customerPhoneNumber: '0123456789',
          restaurantGeom: {
            type: 'Point',
            coordinates: [10.7548816691903, 106.669695864843],
          },
          restaurantAddress: '528 Nguyễn Trãi, P. 8, Quận 5, TP. HCM',
          restaurantName: 'Quán Ăn Maika',
          restaurantPhoneNumber: '0949657934',
          customerAddress: '475A Điện Biên Phủ, Phường 25, Bình Thạnh',
          customerGeom: {
            type: 'Point',
            coordinates: [10.8019386669912, 106.714684816185],
          },
          shippingFee: 40000,
          distance: 7178,
          driverId: null,
          issueNote: null,
          issueType: null,
          deliveredAt: null,
          id: '9f62df57-b24d-4f50-8ebf-d47271f0c8e6',
          createdAt: '2021-05-31T05:16:50.203Z',
          updatedAt: '2021-05-31T05:16:50.203Z',
        },
        grandTotal: 120000,
        cashierId: null,
        itemDiscount: null,
        discount: null,
        note: null,
        id: 'e0f751c8-1bb4-48c3-be07-2d8a8f2dab1c',
        createdAt: '2021-05-31T05:16:50.188Z',
        updatedAt: '2021-05-31T05:16:50.188Z',
      },
    },
    nullable: true,
  })
  data: IOrderData;
}
