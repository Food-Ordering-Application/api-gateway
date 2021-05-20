import { ApiProperty } from '@nestjs/swagger';
import { IFetchPaymentData } from '../../interfaces/';
import { FetchPaymentExampleResponse } from './fetch-payment-response-example';

export class FetchPaymentOfRestaurantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Fetch successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: FetchPaymentExampleResponse,
  })
  data: IFetchPaymentData;
}
