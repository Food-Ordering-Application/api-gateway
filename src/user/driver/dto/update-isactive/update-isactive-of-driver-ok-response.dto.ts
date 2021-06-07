import { ApiProperty } from '@nestjs/swagger';
import { IIsActiveData } from '../../interfaces';

export class UpdateIsActiveOfDriverOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Update isActive successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      isActive: true,
    },
    type: 'string',
  })
  data: IIsActiveData;
}
