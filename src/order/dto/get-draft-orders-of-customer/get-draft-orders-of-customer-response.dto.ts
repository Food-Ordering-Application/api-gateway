import { ApiProperty } from '@nestjs/swagger';
import { IOrdersData } from '../../interfaces';

export class GetDraftOrdersOfCustomerResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Fetch draft orders of customer successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {},
    nullable: true,
  })
  data: IOrdersData;
}
