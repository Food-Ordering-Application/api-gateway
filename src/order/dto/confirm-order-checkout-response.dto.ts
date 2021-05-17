import { ApiProperty } from '@nestjs/swagger';
import { IOrdersData } from '../interfaces';

export class ConfirmOrderCheckoutResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Confirm order checkout successfully',
    type: 'string',
  })
  message: string;
  // @ApiProperty({
  //   example: {},
  //   nullable: true,
  // })
  // data: IOrdersData;
}
