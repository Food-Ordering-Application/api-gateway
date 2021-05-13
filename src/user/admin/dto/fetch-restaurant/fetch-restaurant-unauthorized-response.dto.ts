import { ApiProperty } from '@nestjs/swagger';
import { IFetchRestaurantData } from '../../interfaces/';

export class FetchRestaurantProfilesUnauthorizedResponseDto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized', type: 'string' })
  message: string;
  @ApiProperty({
    example: null,
    nullable: true,
  })
  data: IFetchRestaurantData;
}
