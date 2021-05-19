import { ApiProperty } from '@nestjs/swagger';
import { IOrderData } from '../interfaces';

export class ApprovePaypalOrderResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Approve paypal order successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {},
    nullable: true,
  })
  data: IOrderData;
}
