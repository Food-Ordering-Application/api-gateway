import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDriverDto {
  @ApiProperty({ example: '0123456789', uniqueItems: true, required: true })
  @IsPhoneNumber('VN')
  phoneNumber: string;
  @ApiProperty({ example: 'daylapasscuatui', required: true })
  @IsString()
  password: string;
  @ApiProperty({ example: 'thachdau16t@gmail.com', required: true })
  @MinLength(6)
  @MaxLength(100)
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'Vu Vinh Hien', required: true })
  @MinLength(6)
  @MaxLength(30)
  @IsString()
  name: string;
  @ApiProperty({ example: 'TPHCM', required: true })
  @MaxLength(30)
  @IsString()
  city: string;
  @ApiProperty({ example: '2021-05-30', required: true })
  @IsString()
  dateOfBirth: Date;
  @ApiProperty({ example: '053168469', required: true })
  @IsString()
  IDNumber: string;
  @ApiProperty({ example: '59-Z1 011.01', required: true })
  @IsString()
  licensePlate: string;
  @ApiProperty({ example: 'somelink.jpg', required: true })
  @IsString()
  avatar: string;
  @ApiProperty({ example: 'DD64LQSRDC2UN', required: true })
  @MaxLength(20)
  @IsString()
  merchantIdInPaypal: string;
  @ApiProperty({ example: 'somelink.jpg', required: true })
  @IsString()
  identityCardImageUrl: string;
  @ApiProperty({ example: 'somelink.jpg', required: true })
  @IsString()
  driverLicenseImageUrl: string;
  @ApiProperty({ example: 'somelink.jpg', required: true })
  @IsString()
  vehicleRegistrationCertificateImageUrl: string;
}
