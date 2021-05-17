import { ApiProperty } from '@nestjs/swagger';

export class SavePosOrderUnauthorizedResponseDto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({
    example: 'Cannot save order of another restaurant',
    type: 'string',
  })
  message: string;
}
