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
          id: 'b42e5f64-bb12-42f0-bf3c-ce7975ff0c76',
          customerId: 'da552594-d925-4311-ab2f-303d26abdae1',
          driverId: null,
          customerAddress: null,
          customerGeom: null,
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
