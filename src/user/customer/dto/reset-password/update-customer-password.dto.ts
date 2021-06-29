import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class UpdateCustomerPasswordDto {
  @ApiProperty({
    example: '0c1df8c8-40b1-41b4-a897-702e09f1fd60',
    required: true,
  })
  @IsUUID()
  customerId: string;

  @ApiProperty({
    example: 'daylapassword',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '702e09c8-40b1-41b4-a897-702e09f1fd60',
    required: true,
  })
  @IsString()
  resetToken: string;
}
