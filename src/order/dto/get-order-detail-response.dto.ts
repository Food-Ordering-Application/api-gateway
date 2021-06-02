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
          customerName: null,
          customerPhoneNumber: null,
          customerAddress: '475A Điện Biên Phủ, Phường 25, Bình Thạnh',
          customerGeom: {
            type: 'Point',
            coordinates: [10.8019386669912, 106.714684816185],
          },
          restaurantName: null,
          restaurantPhoneNumber: null,
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
          orderTime: null,
          deliveredAt: null,
          expectedDeliveryTime: null,
        },
        invoice: {
          status: 'REFUNDED',
          payment: {
            method: 'PAYPAL',
            status: 'PENDING_REFUNDED',
            amount: 120000,
          },
        },
        orderItems: [
          {
            id: 'c2e6de45-e3c6-492b-9f10-405b9fe77f0b',
            menuItemId: 'e82c236b-f27e-4e09-b089-9542674e4ea7',
            orderId: '20a173f3-2d22-46f6-9a2e-a82c600e1647',
            price: 40000,
            subTotal: 40000,
            name: 'Mì cay',
            quantity: 2,
            discount: 0,
            state: 'OUT_OF_STOCK',
            orderItemToppings: [
              {
                id: 'c9ddcf7b-18b2-404f-bd42-8bc37e0225c2',
                toppingItemId: '5eac3acf-dd82-4781-9752-ecf2c0b126cf',
                name: 'Nước sốt Thái',
                quantity: 1,
                price: null,
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
