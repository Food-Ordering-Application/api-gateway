import { ApiProperty } from '@nestjs/swagger';

export class GetRevenueInsightOfRestaurantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Get revenue insight of restaurant successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      revenueInsight: {
        actualRevenue: 2173747.95,
        feeTotal: 62328.05,
        feePaid: 0,
        feeBilling: 62328.05,
        allOrderCount: 28,
        allOrderTotalRevenue: 2236076,
        saleOrderCount: 25,
        saleOrderTotalRevenue: 1246561,
        saleCODOrderCount: 25,
        saleCODOrderTotalRevenue: 1246561,
        saleOnlineOrderCount: 0,
        saleOnlineOrderTotalRevenue: 0,
        posOrderCount: 3,
        posOrderTotalRevenue: 989515,
      },
    },
    nullable: true,
  })
  data: any;
}
