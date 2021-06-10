import { ApiProperty } from '@nestjs/swagger';
import { IIsAutoConfirmData } from '../../interfaces';

export class UpdateIsAutoConfirmOrderOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Update isAutoConfirm successfully',
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
