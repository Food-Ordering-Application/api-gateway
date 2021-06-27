import { ApiProperty } from '@nestjs/swagger';

export class RateDriverResponseDto {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Rate driver successfully',
  })
  message: string;
}
