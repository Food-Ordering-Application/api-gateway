import { ApiProperty } from '@nestjs/swagger';

export class FetchMenuGroupOfRestaurantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Fetched menu group successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      results: [
        {
          id: '2e8af62c-b32c-4eda-bdaa-4cde6e3564a8',
          menuId: '7bd1efce-d873-43b0-9412-14335dbe3b47',
          name: 'Mì 2',
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
