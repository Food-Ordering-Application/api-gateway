import { ApiProperty } from '@nestjs/swagger';

export class VoidOrderResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Void order successfully', type: 'string' })
  message: string;
}
