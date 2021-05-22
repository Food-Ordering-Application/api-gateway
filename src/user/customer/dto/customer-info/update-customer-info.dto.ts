import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { EGender } from '../../enums';

export class UpdateCustomerInfoDto {
  @ApiProperty({
    example: 'Nguyễn Văn A',
    required: true,
  })
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
