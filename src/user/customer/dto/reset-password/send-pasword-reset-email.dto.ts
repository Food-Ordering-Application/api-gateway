import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendResetPasswordEmailDto {
  @ApiProperty({
    example: 'thachdau16t@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;
}
