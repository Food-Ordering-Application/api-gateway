import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMerchantDto {
  @ApiProperty({ example: 'merchant123', uniqueItems: true, required: true })
  @MinLength(6)
  @MaxLength(30)
  @IsString()
  username: string;

  @ApiProperty({ minLength: 6, example: '123123', required: true })
  @MinLength(8)
  @MaxLength(50)
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')
  @IsString()
  password: string;

  @ApiProperty({ example: 'abc@gmail.com', required: true })
  @MinLength(6)
  @MaxLength(100)
  @IsEmail()
  email: string;

  @ApiProperty({ example: '0949654744', required: true })
  @IsPhoneNumber('VN')
  phone: string;

  @ApiProperty({ example: 'Nguyễn Văn Phúc', required: true })
  @MinLength(6)
  @MaxLength(50)
  @IsString()
  fullName: string;

  @ApiProperty({ example: '272699300', required: true })
  @IsString()
  IDNumber: string;
}
