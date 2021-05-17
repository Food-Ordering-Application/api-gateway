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
          id: 'd34d2c71-46d4-4689-8dd4-e8d0ca66ddf7',
          cashierId: 'fd112804-7279-407f-a596-96291005555e',
          restaurantId: 'f1db260f-b2fa-4862-9041-2a7d3b481733',
          itemDiscount: 232208,
          discount: 416,
          subTotal: 198087,
          grandTotal: 297507,
          note:
            'Sunt quam saepe. Qui nihil placeat modi. Quam nulla autem neque vero vel.',
          createdAt: '2021-12-08T04:45:56.647Z',
          updatedAt: '2021-05-12T14:27:46.967Z',
          status: 'ORDERED',
          delivery: {
            id: 'd9b6bb95-33a0-4ac7-84f1-b9ca7aa3ab06',
            customerId: '59e3a8ee-d0bd-48b2-b4a8-90b8d5c55f1c',
            driverId: '253b7c1a-a5e3-457a-9cf0-14eeadabea81',
            customerAddress: '9920 Doyle Unions Suite 194',
            customerGeom: {
              type: 'Point',
              coordinates: [63.6067, 7.5969],
            },
            restaurantAddress: '7704 Schoen Trail Suite 818',
            restaurantGeom: {
              type: 'Point',
              coordinates: [81.2852, -77.4606],
            },
            distance: 14036,
            shippingFee: 15107,
            status: 'CANCELLED',
            createdAt: '2021-05-12T14:27:47.110Z',
            updatedAt: '2021-05-12T14:27:47.110Z',
            deliveredAt: '2022-02-25T11:54:37.016Z',
          },
        },
        {
          id: '20e015ba-9d72-4b86-bcf3-054b0021dabd',
          cashierId: '0f5e5ff3-477e-441d-8640-75b167148b04',
          restaurantId: 'f1db260f-b2fa-4862-9041-2a7d3b481733',
          itemDiscount: 176571,
          discount: 1149,
          subTotal: 275796,
          grandTotal: 144303,
          note:
            'Sapiente ducimus soluta. Ut doloribus id et. Tenetur natus animi harum eligendi iste sed et. Ipsa tempora fugit id sit ea perspiciatis praesentium. Recusandae iure totam est. Et excepturi beatae maiores pariatur in molestiae et.',
          createdAt: '2021-12-08T04:45:56.647Z',
          updatedAt: '2021-05-12T14:27:46.973Z',
          status: 'ORDERED',
          delivery: {
            id: 'cabe02dc-957b-4d83-8ced-59e4b55542a3',
            customerId: '0c15435c-b64d-44d5-86b3-b6ba03f6a62f',
            driverId: 'da028aee-8625-46e5-b599-e18b5ba1e3fe',
            customerAddress: '850 Sam Extension Apt. 207',
            customerGeom: {
              type: 'Point',
              coordinates: [52.2439, -46.6949],
            },
            restaurantAddress: '87576 Alene Mountain Suite 309',
            restaurantGeom: {
              type: 'Point',
              coordinates: [-18.9212, -132.4447],
            },
            distance: 8642,
            shippingFee: 7046,
            status: 'DELIVIRED',
            createdAt: '2021-05-12T14:27:47.120Z',
            updatedAt: '2021-05-12T14:27:47.120Z',
            deliveredAt: '2022-04-05T10:04:54.478Z',
          },
        },
      ],
    },
    nullable: true,
  })
  data: IOrdersData;
}
