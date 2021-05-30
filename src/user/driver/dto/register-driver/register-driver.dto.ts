import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class RegisterDriverDto {
  @ApiProperty({ example: '0123456789', uniqueItems: true, required: true })
  @IsString()
  phoneNumber: string;
  @ApiProperty({ example: 'daylapasscuatui', required: true })
  @IsString()
  password: string;
  @ApiProperty({ example: 'thachdau16t@gmail.com', required: true })
  @IsString()
  email: string;
  @ApiProperty({ example: 'Vu Vinh Hien', required: true })
  @IsString()
  name: string;
  @ApiProperty({ example: 'TPHCM', required: true })
  @IsString()
  city: string;
  @ApiProperty({ example: '2021-05-30', required: true })
  @IsString()
  dateOfBirth: Date;
  @ApiProperty({ example: '053168469', required: true })
  @IsString()
  IDNumber: string;
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
