import { ApiProperty } from '@nestjs/swagger';
import { IOrderData } from '../interfaces';

export class RemoveOrderItemResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'OrderItem remove successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      order: {
        id: '59ab5bbf-5112-4ffb-afd4-37d6a8017ec1',
        cashierId: null,
        restaurantId: '28365171-79a7-4a5e-8846-bb4152670131',
        itemDiscount: null,
        discount: null,
        subTotal: 80000,
        grandTotal: 80000,
        note: null,
        createdAt: '2021-05-12T14:52:57.355Z',
        updatedAt: '2021-05-12T15:01:02.016Z',
        status: 'DRAFT',
        delivery: {
          id: '9f62df57-b24d-4f50-8ebf-d47271f0c8e6',
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
          createdAt: '2021-05-31T05:16:50.203Z',
          updatedAt: '2021-05-31T05:16:50.203Z',
        },
        orderItems: [
          {
            id: '78cc8de3-9ee9-4717-97d0-8d0098bd0856',
            menuItemId: '1f7ae35f-b96d-4859-bdd1-65db95fa9a42',
            price: 10000,
            name: 'Mariela Okuneva',
            quantity: 2,
            discount: 0,
            state: 'IN_STOCK',
            orderItemToppings: [
              {
                id: '63bbf1b9-cbed-4f9d-a934-f79e8b965275',
                menuItemToppingId: 'e8f311bf-4687-451d-b55d-0d5c4b105acd',
                name: 'Mariela Okuneva DDS 11',
                quantity: 1,
                price: 7000,
                state: 'IN_STOCK',
              },
              {
                id: '628ca19b-863e-4fce-a180-cb20b46ab8c3',
                menuItemToppingId: '17478751-c055-4111-9755-f5535e10b7a1',
                name: 'Mariela Okuneva DDS 22',
                quantity: 1,
                price: 3000,
                state: 'IN_STOCK',
              },
            ],
          },
          {
            id: '0467f97c-98ab-45b7-8b2a-d36ea2ed99b8',
            menuItemId: '1f7ae35f-b96d-4859-bdd1-65db95fa9a42',
            price: 13000,
            name: 'Mariela Okuneva',
            quantity: 2,
            discount: 0,
            state: 'IN_STOCK',
            orderItemToppings: [
              {
                id: 'd48cfead-dbf4-4207-a294-17301f62de9f',
                menuItemToppingId: 'e8f311bf-4687-451d-b55d-0d5c4b105acd',
                name: 'Mariela Okuneva DDS 11',
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
