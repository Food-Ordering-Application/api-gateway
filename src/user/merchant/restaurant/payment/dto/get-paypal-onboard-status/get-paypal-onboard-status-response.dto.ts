import { ApiProperty } from '@nestjs/swagger';
import { PayPalOnboardStatus } from '../../enums/paypal-onboard-status.enum';

export class GetPayPalOnboardStatusResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Restaurant was onboard',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      isOnboard: true,
      message: 'ONBOARD',
    },
  })
  data: {
    isOnboard: boolean;
    message: PayPalOnboardStatus;
  };
}
