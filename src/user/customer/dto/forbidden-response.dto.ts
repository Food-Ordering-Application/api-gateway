import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenResponseDto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Forbidden', type: 'string' })
  message: string;
}
