import { ApiProperty } from '@nestjs/swagger';

export class GetMenuInsightOfRestaurantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Get menu insight of restaurant successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      menuItems: [
        {
          menuItemId: '2972f80c-f8d9-42cd-bb5d-9d6f87cfe3e8',
          allOrderCount: 3,
          allOrderTotalQuantities: 3,
          saleOrderCount: 2,
          saleOrderTotalQuantities: 2,
          posOrderCount: 1,
          posOrderTotalQuantities: 1,
          name: 'Marco Mann',
          description: 'Est ex autem consequatur sint.',
          price: 17098,
          imageUrl: 'http://lorempixel.com/640/480',
          state: 'IN_STOCK',
        },
        {
          menuItemId: '6a52d119-9e1f-4428-9c0a-3bc0d291668e',
          allOrderCount: 13,
          allOrderTotalQuantities: 13,
          saleOrderCount: 13,
          saleOrderTotalQuantities: 13,
          posOrderCount: 0,
          posOrderTotalQuantities: 0,
          name: 'Aliyah Koelpin',
          description: 'Qui amet quaerat aut mollitia.',
          price: 15079,
          imageUrl: 'http://lorempixel.com/640/480',
          state: 'IN_STOCK',
        },
        {
          menuItemId: '7b99cbaf-787e-434c-aa74-42472ebc9415',
          allOrderCount: 2,
          allOrderTotalQuantities: 2,
          saleOrderCount: 2,
          saleOrderTotalQuantities: 2,
          posOrderCount: 0,
          posOrderTotalQuantities: 0,
          name: 'Lora Halvorson',
          description: 'Velit dolor sed asperiores non.',
          price: 13231,
          imageUrl: 'http://lorempixel.com/640/480',
          state: 'IN_STOCK',
        },
        {
          menuItemId: '93f537c9-c238-4b5b-b4d4-79763bb45fa4',
          allOrderCount: 13,
          allOrderTotalQuantities: 13,
          saleOrderCount: 13,
          saleOrderTotalQuantities: 13,
          posOrderCount: 0,
          posOrderTotalQuantities: 0,
          name: "Buford D'Amore",
          description: 'Minus consequatur qui.',
          price: 16306,
          imageUrl: 'http://lorempixel.com/640/480',
          state: 'IN_STOCK',
        },
      ],
    },
    nullable: true,
  })
  data: any;
}
