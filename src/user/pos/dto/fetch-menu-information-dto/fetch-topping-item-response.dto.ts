import { ApiProperty } from '@nestjs/swagger';

export class FetchToppingItemOfRestaurantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Fetched topping item successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      results: [
        {
          id: '5eac3acf-dd82-4781-9752-ecf2c0b126cf',
          menuId: '7bd1efce-d873-43b0-9412-14335dbe3b47',
          toppingGroupId: '3b28277b-1c52-442f-8400-c603c151d7d4',
          name: 'Nước sốt Thái',
          description: 'Nước sốt Hàn Quốc vị cay',
          price: 9000,
          maxQuantity: 1,
          isActive: true,
          index: 30000,
        },
        {
          id: '7b1f3536-8e93-4555-b52b-be471c6b3b96',
          menuId: '7bd1efce-d873-43b0-9412-14335dbe3b47',
          toppingGroupId: '3b28277b-1c52-442f-8400-c603c151d7d4',
          name: 'Nước sốt Hàn Quốc',
          description: 'Nước sốt Hàn Quốc vị cay',
          price: 9000,
          maxQuantity: 1,
          isActive: true,
          index: 65536,
        },
      ],
      size: 10,
      total: 1,
    },
    nullable: true,
  })
  data: any;
}
