import { ApiProperty } from '@nestjs/swagger';
import { IOrdersData } from '../../interfaces';

export class GetOrderHistoryOfCustomerResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Fetch order history of customer successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {},
    nullable: true,
  })
  data: IOrdersData;
}
