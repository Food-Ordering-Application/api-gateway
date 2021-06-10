import { ApiProperty } from '@nestjs/swagger';
import { ICity, IGetCityData } from 'src/geo/interfaces';

export class GetCityResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Get city from location successfully',
  })
  message: string;

  @ApiProperty({
    example: {
      city: {
        id: 5,
        name: 'TP. Hồ Chí Minh',
      },
    },
  })
  data: IGetCityData;
}
