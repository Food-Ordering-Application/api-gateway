import { ApiProperty } from '@nestjs/swagger';
import { IDriversData } from '../../interfaces';

export class GetListDriverOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'List driver fetched successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      drivers: [],
    },
    type: 'string',
  })
  data: IDriversData;
}
