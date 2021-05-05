import { ApiProperty } from '@nestjs/swagger';
import { IOrderData } from '../interfaces';

export class GetOrderDetailResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Order fetched successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {},
    nullable: true,
  })
  data: IOrderData;
}
