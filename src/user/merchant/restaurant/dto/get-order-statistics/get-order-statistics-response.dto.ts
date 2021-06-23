import { ApiProperty } from '@nestjs/swagger';

export class GetOrderStatisticsOfRestaurantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Get order statistics of restaurant successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      statistics: [
        {
          columnName: '01-06',
          allOrderCount: 6,
          allOrderTotalRevenue: 336830,
          saleOrderCount: 6,
          saleOrderTotalRevenue: 336830,
          posOrderCount: 0,
          posOrderTotalRevenue: 0,
        },
        {
          columnName: '08-06',
          allOrderCount: 14,
          allOrderTotalRevenue: 1542402,
          saleOrderCount: 11,
          saleOrderTotalRevenue: 552887,
          posOrderCount: 3,
          posOrderTotalRevenue: 989515,
        },
        {
          columnName: '15-06',
          allOrderCount: 5,
          allOrderTotalRevenue: 244182,
          saleOrderCount: 5,
          saleOrderTotalRevenue: 244182,
          posOrderCount: 0,
          posOrderTotalRevenue: 0,
        },
        {
          columnName: '22-06',
          allOrderCount: 3,
          allOrderTotalRevenue: 112662,
          saleOrderCount: 3,
          saleOrderTotalRevenue: 112662,
          posOrderCount: 0,
          posOrderTotalRevenue: 0,
        },
        {
          columnName: '29-06',
          allOrderCount: 0,
          allOrderTotalRevenue: 0,
          saleOrderCount: 0,
          saleOrderTotalRevenue: 0,
          posOrderCount: 0,
          posOrderTotalRevenue: 0,
        },
      ],
    },
    nullable: true,
  })
  data: any;
}
