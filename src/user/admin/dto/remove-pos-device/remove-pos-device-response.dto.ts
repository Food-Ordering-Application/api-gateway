import { ApiProperty } from '@nestjs/swagger';

export class RemovePosDeviceResponseDto {
  @ApiProperty({ example: 200, description: 'Return status code' })
  statusCode: number;
  @ApiProperty({
    example: 'Remove POS device successfully',
    type: 'string',
  })
  message: string;
}
