import { ApiProperty } from '@nestjs/swagger';
import { IOrdersData } from '../interfaces';

export class GetListOrderOfDriverResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'List orders of driver fetched successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {},
    nullable: true,
  })
  data: IOrdersData;
}
