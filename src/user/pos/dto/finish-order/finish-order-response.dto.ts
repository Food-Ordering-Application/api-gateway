import { ApiProperty } from '@nestjs/swagger';

export class FinishOrderResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Update order to be ready successfully' })
  message: string;
}
