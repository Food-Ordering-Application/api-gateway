import { ApiProperty } from '@nestjs/swagger';

export class UpdateZALOPAYPaymentStatusResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Update zalopay payment status',
    type: 'string',
  })
  message: string;
}
