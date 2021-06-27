import { IVerifyRestaurantResponseData } from '../../interfaces/verify-restaurant-response-data';
import { ApiProperty } from '@nestjs/swagger';

export class GeneratePosKeyResponseDto {
  @ApiProperty({ example: 200, description: 'Return status code' })
  statusCode: number;
  @ApiProperty({
    example: 'Generate POS app key for restaurant successfully',
    type: 'string',
  })
  message: string;

  @ApiProperty({
    example: {
      posAppKey: '1234-1234-1234',
    },
  })
  data: IVerifyRestaurantResponseData;
}
