import { ApiProperty } from '@nestjs/swagger';

export class RateRestaurantResponseDto {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Rate restaurant successfully',
  })
  message: string;
}
