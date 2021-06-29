import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class VerifyCustomerPhoneNumberDto {
  @ApiProperty({ example: '123456', required: true })
  @IsNumberString()
  otp: string;
}
