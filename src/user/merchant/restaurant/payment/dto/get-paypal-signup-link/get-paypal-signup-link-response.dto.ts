import { ApiProperty } from '@nestjs/swagger';

export class GetPayPalSignUpLinkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Generate PayPal partner referral sign up link successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      action_url:
        'https://www.sandbox.paypal.com/partnerexp/appEntry?referralToken=NzZjYTdjZmUtOWEyNC00MjVkLWIyOTMtZjA4MTQxNjhhMTBhUzZHZWVNYlNCYmdRb2NwT0dyU2FPeUFzV0s3ZWNZbXZVR2tLOTVTZUE4MD12Mg==',
    },
    type: 'string',
  })
  data: {
    action_url: string;
  };
}
