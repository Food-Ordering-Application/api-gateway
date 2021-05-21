import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetPayPalSignUpLinkDto {
  @ApiProperty({
    example: 'https://merchant.app/paypal-integration',
    required: true,
    description: 'Redirect url after user finish PayPal onboard process',
  })
  @IsString()
  redirectUrl: string;
}
