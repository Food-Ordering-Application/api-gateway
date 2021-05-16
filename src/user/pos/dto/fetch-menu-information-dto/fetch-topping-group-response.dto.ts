import { ApiProperty } from '@nestjs/swagger';

export class FetchToppingGroupOfRestaurantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Fetched topping group successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      results: [
        {
          id: '3b28277b-1c52-442f-8400-c603c151d7d4',
          menuId: '7bd1efce-d873-43b0-9412-14335dbe3b47',
          name: 'Nước sốt',
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
