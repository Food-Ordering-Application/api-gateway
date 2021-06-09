import { ApiProperty } from '@nestjs/swagger';
import { ICity } from '../../interfaces';

export class GetDistrictsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Fetched districts of city successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      city: {
        id: 5,
        name: 'TP. Hồ Chí Minh',
        districts: [{ id: 145, name: 'Quận 5' }],
      },
    },
  })
  data: {
    city: ICity;
  };
}
