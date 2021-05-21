import { ApiProperty } from '@nestjs/swagger';
export class AddPaypalPaymentNotFoundResponse {
  @ApiProperty({ example: 404 })
  statusCode: number;
  @ApiProperty({ example: 'Merchant or restaurant not found', type: 'string' })
  message: string;
}
