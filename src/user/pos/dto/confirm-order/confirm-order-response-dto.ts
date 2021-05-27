import { ApiProperty } from '@nestjs/swagger';

export class ConfirmOrderResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Confirm order successfully', type: 'string' })
  message: string;
}
