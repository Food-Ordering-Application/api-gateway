import { ApiProperty } from '@nestjs/swagger';
import { ILocationData } from '../../interfaces';

export class GetLatestDriverLocationResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Get latest location of driver successfully',
  })
  message: string;
  @ApiProperty({
    example: {
      location: {
        latitude: 10.754902742289849,
        longitude: 106.67038252476121,
      },
    },
  })
  data: ILocationData;
}
