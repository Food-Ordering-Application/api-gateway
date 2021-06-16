import { ApiProperty } from '@nestjs/swagger';
import { IIsAutoConfirmData } from '../../interfaces';

export class GetIsAutoConfirmOrderOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Get isAutoConfirm successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      isAutoConfirm: true,
    },
    type: 'string',
  })
  data: IIsAutoConfirmData;
}
