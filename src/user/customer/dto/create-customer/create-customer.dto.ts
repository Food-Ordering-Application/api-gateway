import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: '0123456789', uniqueItems: true, required: true })
  @IsPhoneNumber('VN')
  phoneNumber: string;
  @ApiProperty({ minLength: 6, example: 'daylapasscuatui', required: true })
  @IsString()
  password: string;
}
