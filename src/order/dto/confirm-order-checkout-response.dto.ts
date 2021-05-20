import { ApiProperty } from '@nestjs/swagger';
import { IConfirmOrderCheckout } from '../interfaces';

export class ConfirmOrderCheckoutResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Confirm order checkout successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      paypalOrderId: 'PAYPAL_ORDER_ID',
    },
    nullable: true,
  })
  data: IConfirmOrderCheckout;
}
