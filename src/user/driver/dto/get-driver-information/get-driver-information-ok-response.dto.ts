import { ApiProperty } from '@nestjs/swagger';
import {
  IDriver,
  IDriverInformationData,
  IDriverTransactions,
} from '../../interfaces';

export class GetDriverInformationOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Driver information fetched successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      driverInfo: {
        phoneNumber: '123456789',
        name: 'Nguyen Tai Xe',
        licensePlate: '59 BA 2135.58',
        avatar: 'somelink.jpg',
      },
    },
    type: 'string',
  })
  data: IDriverInformationData;
}
