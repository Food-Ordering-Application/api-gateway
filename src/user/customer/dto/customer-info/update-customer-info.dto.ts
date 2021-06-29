import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EGender } from '../../enums';

export class UpdateCustomerInfoDto {
  @ApiProperty({
    example: 'Nguyễn Văn A',
    required: true,
  })
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'somelink.jpg',
    required: true,
  })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({
    example: 'someemail@gmail.com',
    required: true,
  })
  @MinLength(6)
  @MaxLength(100)
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'Male',
    enum: EGender,
    required: true,
  })
  @IsEnum(EGender)
  @IsOptional()
  gender?: string;
}
