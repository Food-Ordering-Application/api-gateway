import { ApiProperty } from '@nestjs/swagger';

export class AddPaypalPaymentResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Add Paypal payment successfully', type: 'string' })
  message: string;
}
