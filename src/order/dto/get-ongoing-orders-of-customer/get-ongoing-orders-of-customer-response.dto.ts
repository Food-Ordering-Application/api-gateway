import { ApiProperty } from '@nestjs/swagger';
import { IOrdersData } from '../../interfaces';

export class GetOngoingOrdersOfCustomerResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Fetch ongoing orders of customer successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {},
    nullable: true,
  })
  data: IOrdersData;
}
