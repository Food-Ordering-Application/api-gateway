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
        restaurantId: '28365171-79a7-4a5e-8846-bb4152670131',
        paymentType: 'COD',
        status: 'DRAFT',
        orderItems: [
          {
            menuItemId: '1f7ae35f-b96d-4859-bdd1-65db95fa9a42',
            price: 10000,
            quantity: 2,
            name: 'Mariela Okuneva',
            orderItemToppings: [
              {
                menuItemToppingId: 'e8f311bf-4687-451d-b55d-0d5c4b105acd',
                price: 7000,
                quantity: 1,
                name: 'Mariela Okuneva DDS 11',
                state: 'IN_STOCK',
                id: '63bbf1b9-cbed-4f9d-a934-f79e8b965275',
              },
              {
                menuItemToppingId: '17478751-c055-4111-9755-f5535e10b7a1',
                price: 3000,
                quantity: 1,
                name: 'Mariela Okuneva DDS 22',
                state: 'IN_STOCK',
                id: '628ca19b-863e-4fce-a180-cb20b46ab8c3',
              },
            ],
            discount: 0,
            id: '78cc8de3-9ee9-4717-97d0-8d0098bd0856',
            state: 'IN_STOCK',
          },
        ],
        subTotal: 40000,
        grandTotal: 40000,
        cashierId: null,
        itemDiscount: null,
        discount: null,
        note: null,
        id: '59ab5bbf-5112-4ffb-afd4-37d6a8017ec1',
        createdAt: '2021-05-12T14:52:57.355Z',
        updatedAt: '2021-05-12T14:52:57.355Z',
        delivery: {
          customerId: 'da552594-d925-4311-ab2f-303d26abdae1',
          status: 'DRAFT',
          restaurantGeom: {
            type: 'Point',
            coordinates: [10.7566764, 106.6626456],
          },
          restaurantAddress: '629 Ray Lane',
          driverId: null,
          customerAddress: null,
          customerGeom: null,
          distance: null,
          shippingFee: 15000,
          deliveredAt: null,
          id: 'b42e5f64-bb12-42f0-bf3c-ce7975ff0c76',
          createdAt: '2021-05-12T14:52:57.363Z',
          updatedAt: '2021-05-12T14:52:57.363Z',
        },
      },
    },
    nullable: true,
  })
  data: IOrderData;
}
