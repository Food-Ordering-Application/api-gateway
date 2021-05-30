import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendPhoneNumberOtpVerifyDto {
  @ApiProperty({ example: '0123456789', required: true })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: '', required: true })
  @IsString()
  recaptchaToken: string;
}
