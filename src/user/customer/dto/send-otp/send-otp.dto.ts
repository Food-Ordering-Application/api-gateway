import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

export class SendPhoneNumberOtpVerifyDto {
  @ApiProperty({ example: '0123456789', required: true })
  @IsPhoneNumber('VN')
  phoneNumber: string;

  @ApiProperty({ example: '', required: true })
  @IsString()
  recaptchaToken: string;
}
