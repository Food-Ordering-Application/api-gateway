import { ApiProperty } from '@nestjs/swagger';

export class FetchMenuItemOfRestaurantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Fetched menu item successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      results: [
        {
          id: 'e82c236b-f27e-4e09-b089-9542674e4ea7',
          menuId: '7bd1efce-d873-43b0-9412-14335dbe3b47',
          menuGroupId: '2e8af62c-b32c-4eda-bdaa-4cde6e3564a8',
          name: 'Mì cay',
          description: 'Mì cay Hàn Quốc',
          price: 40000,
          imageUrl: 'http://lorempixel.com/640/480',
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
