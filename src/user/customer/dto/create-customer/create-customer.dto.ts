import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: '0123456789', uniqueItems: true, required: true })
  @IsPhoneNumber('VN')
  phoneNumber: string;
  @ApiProperty({ minLength: 8, example: 'daylapasscuatui', required: true })
  @MinLength(8)
  @MaxLength(50)
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')
  @IsString()
  password: string;
}
