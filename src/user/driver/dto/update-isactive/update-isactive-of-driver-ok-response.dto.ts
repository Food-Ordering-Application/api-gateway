import { ApiProperty } from '@nestjs/swagger';
import { IIsActiveData } from '../../interfaces';

export class UpdateIsActiveOfDriverOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Update active status successfully',
    type: 'string',
  })
  message: string;
}
