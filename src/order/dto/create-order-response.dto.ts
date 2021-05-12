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
        restaurantId: '32b68637-bb8a-4466-b164-5085a347267b',
        paymentType: 'COD',
        status: 'DRAFT',
        orderItems: [
          {
            menuItemId: '49fdf967-bd5c-401e-8416-f45811c7e842',
            price: 10000,
            quantity: 2,
            orderItemToppings: [
              {
                menuItemToppingId: '85bff6d5-97a8-4279-989f-fde0d702cb14',
                price: 7000,
                quantity: 1,
                state: 'IN_STOCK',
                id: '0e47577e-d121-43cf-8136-5aa21d67cc45',
              },
              {
                menuItemToppingId: 'd7d4c372-49be-4358-a5a9-f369194348b9',
                price: 3000,
                quantity: 1,
                state: 'IN_STOCK',
                id: 'b4d31d20-b51b-454c-9bac-cac1dfb965bb',
              },
            ],
            discount: 0,
            id: '8051c754-2d84-4d3f-adc2-e8537205c7f7',
            state: 'IN_STOCK',
          },
        ],
        subTotal: 40000,
        cashierId: null,
        itemDiscount: null,
        discount: null,
        grandTotal: 60000,
        note: null,
        id: '0102f7bf-c7cb-457d-b0fe-ce26dca3fab0',
        createdAt: '2021-05-12T10:04:17.659Z',
        updatedAt: '2021-05-12T10:04:17.659Z',
        delivery: {
          customerId: '6e194a75-d474-411d-9c52-3fea837e4933',
          status: 'DRAFT',
          shippingFee: 20000,
          distance: 3389,
          driverId: null,
          address: null,
          deliveredAt: null,
          id: 'd5c916e9-7416-4c3e-af8a-d72d2a6b3a5e',
          createdAt: '2021-05-12T10:04:17.711Z',
          updatedAt: '2021-05-12T10:04:17.711Z',
        },
      },
    },
    nullable: true,
  })
  data: IOrderData;
}
