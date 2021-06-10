import { ApiProperty } from '@nestjs/swagger';
import { ICity } from 'src/geo/interfaces';

export class GetCitiesResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Fetched all cities successfully',
  })
  message: string;

  @ApiProperty({
    example: {
      cities: [
        {
          id: 5,
          name: 'TP. Hồ Chí Minh',
        },
      ],
    },
  })
  data: {
    cities: ICity[];
  };
}
