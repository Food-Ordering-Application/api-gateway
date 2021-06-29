import { ApiProperty } from '@nestjs/swagger';
import { IDriversData } from '../../interfaces';

export class GetListDriverOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'List driver fetched successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      drivers: [
        {
          id: 'someid',
          phoneNumber: '0123456789',
          email: 'somemeail',
          name: 'somename',
          city: 'some',
          dateOfBirth: 'some',
          IDNumber: 'some',
          identityCardImageUrl: 'some',
          driverLicenseImageUrl: 'some',
          vehicleRegistrationCertificateImageUrl: 'some',
          isVerified: true,
          isBanned: false,
        },
        {
          id: 'someid',
          phoneNumber: '0123456789',
          email: 'somemeail',
          name: 'somename',
          city: 'some',
          dateOfBirth: 'some',
          IDNumber: 'some',
          identityCardImageUrl: 'some',
          driverLicenseImageUrl: 'some',
          vehicleRegistrationCertificateImageUrl: 'some',
          isVerified: true,
          isBanned: false,
        },
      ],
    },
  })
  data: IDriversData;
}
